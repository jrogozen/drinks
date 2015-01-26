'use strict';

var express = require('express');
var app = express();
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }))

/* DB STUFF */
var mongoose = require('mongoose');

mongoose.connect(config.mongo_uri);

var server = require('http').createServer(app);

/* ROUTES */
require('./routes')(app);

/* START THE SERVER */
server.listen(config.port, function() {
  console.log('Magic sometimes happens on port ' + config.port);
});

exports = module.exports = app;