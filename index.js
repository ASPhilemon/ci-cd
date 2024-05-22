const express = require('express');
const { exec } = require('child_process');
require('dotenv').config()

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body.ref)
  const { ref } = req.body;
  if (ref === 'refs/heads/main') { // Check if the push is to the main branch
    res.status(200).send('Deploying changes ...');
    exec(process.env.GROWTHSPRING_API_DEPLOY, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
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
