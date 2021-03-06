const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});

app.use('/', express.static(path.join(__dirname, '/client/build')));

module.exports = app;
