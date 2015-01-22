var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client') });
});

var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('listening at http://%s:%s', host, port);
});