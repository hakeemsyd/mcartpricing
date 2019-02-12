const express = require('express');
const path = require('path');
const process = require('process');

const app = express();

// Serve static files
app.use(express.static('./dist/mcartpricing'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join('./dist/mcartpricing/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);
