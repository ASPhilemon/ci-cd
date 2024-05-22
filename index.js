const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
  const { ref } = req.body;
  if (ref === 'refs/heads/main') { // Check if the push is to the main branch
    exec(process.env.GROWTHSPRING_API_DEPLOY, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Error');
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.status(200).send('Success');
    });
  } else {
    res.status(200).send('No action taken');
  }
});

const PORT = process.env.PORT || 3018;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
