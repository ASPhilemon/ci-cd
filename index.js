const express = require('express');
const { exec } = require('child_process');
const {sendMail} = require('./sendMail.js');
const { log } = require('console');
require('dotenv').config()

const app = express();
app.use(express.json());

console.log(process.env.GROWTHSPRING_API_DEPLOY)

const recipients = ["philemonariko@gmail.com"]

app.post('/', (req, res) => {
    console.log(req.body.ref)
  const { ref } = req.body;
  if (ref === 'refs/heads/main') { // Check if the push is to the main branch
    res.status(200).send('Deploying changes ...');
    exec(process.env.GROWTHSPRING_API_DEPLOY, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(`exec error: ${error}`);
        recipients.forEach((recipient)=>{
          sendMail({
            recipientEmail,
            sender:"deployments",
            emailSubject: "Deployment Unsuccessful",
            emailTemplate:"deployment-unsuccessful.ejs",
            context: ""
          }
          )
        })
      } else{
        recipients.forEach((recipient)=>{
          sendMail({
            recipientEmail,
            sender:"deployments",
            emailSubject: "Deployment Successful",
            emailTemplate:"deployment-successful.ejs",
            context: ""
          }
          )
        })
      }
    });
  } else {
    res.status(200).send('No action taken');
  }
});

const PORT = process.env.PORT || 3018;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
