'use strict';

var express = require('express');
var app = express();
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('env', process.env.NODE_ENV || 'development');

/* DB STUFF */
var mongoose = require('mongoose');
mongoose.connect(config.db[app.get('env')]);

/* ROUTES */
require('./routes')(app);

/* START THE SERVER */
app.listen(8080);
console.log('running on', app.get('env'));
console.log('Magic sometimes happens on port 8080');

exports = module.exports = app;