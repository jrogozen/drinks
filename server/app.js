var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* DB STUFF */
var mongoose = require('mongoose');
var dbconfig = require('./config/database');
var db = new dbconfig();

mongoose.connect(db.mongo_uri);

var Activity = require('./api/models/activity');

/* ROUTES */
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.route('/activities')
  .post(function(req, res) {
    var activity = new Activity();

    activity.name = req.body.name;
    activity.videos = req.body.videos;
    activity.description = req.body.description;
    activity.wikiLink = req.body.wikiLink;

    activity.save(function(err) {
      if(err)
        res.send(err);

      res.json(activity);
    });

  })

  .get(function(req, res) {
    Activity.find(function(err, activities) {
      if(err)
        res.send(err);

      res.json(activities);
    });
  })
;

router.route('/activities/:activity_id')
  .get(function(req, res) {
    Activity.findById(req.params.activity_id, function(err, activity) {
      if(err)
        res.send(err);

      res.json(activity);
    });
  })

  .put(function(req, res) {
    Activity.findById(req.params.activity_id, function(err, activity) {
      if(err)
        res.send(err);

      activity.name = req.body.name;
      activity.videos = req.body.videos;
      activity.description = req.body.description;
      activity.wikiLink = req.body.wikiLink;

      activity.save(function(err) {
        if(err)
          res.send(err);

        res.json(activity);
      });
    });
  })

  .delete(function(req, res) {
    Activity.remove({
      _id: req.params.activity_id
    }, function(err, activity) {
      if(err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });
;

app.use('/api', router);

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client') });
});

/* START THE SERVER */
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Magic sometimes happens on port ' + port);