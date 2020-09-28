const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fileupload = require('express-fileupload');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploaded_file = req.files.uploaded_file;
  let file_name = uploaded_file.name;
  let upload_path = path.join(__dirname + `/upload/${file_name}`);

  uploaded_file.mv(upload_path, function(err) {
    if (err)
      return res.send(err);
    res.send(`File : ${file_name} is uploaded successfully`);
  });
});

app.listen(process.env.PORT || 8000,
    () => console.log("Server is running..."));