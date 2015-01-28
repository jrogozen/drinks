'use strict';

var Activity = require('./activity.model');
var _ = require('lodash');

exports.index = function(req, res) {
  Activity.find(function(err, activities) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(activities);
  });
};

exports.show = function(req, res) {
  Activity.findById(req.params.id, function(err, activity) {
    if(err) { return handleError(res, err); }
    if(!activity) { return res.sendStatus(404); }
    return res.status(200).json(activity);
  });
};

exports.create = function(req, res) {
  Activity.create(req.body, function(err, activity) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(activity);
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Activity.findById(req.params.id, function(err, activity) {
    if(err) { return handleError(res, err); }
    if(!activity) {return res.sendStatus(404); }
    var updated = _.merge(activity, req.body);
    updated.save(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(activity);
    });
  });
};

exports.destroy = function(req, res) {
  Activity.findById(req.params.id, function(err, activity) {
    if(err) { return handleError(res, err); }
    if(!activity) { return res.sendStatus(404); }
    activity.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.sendStatus(500, err);
}