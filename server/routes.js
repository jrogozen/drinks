'use strict';

var path = require('path');

module.exports = function(app) {
  app.use('/api/activities', require('./api/activity'));

  app.route('/*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../client') });
  });
};