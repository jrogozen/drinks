'use strict';

var Drink = require('./drink.model');
var _ = require('lodash');

exports.index = function(req, res) {
  Drink.find(function(err, drinks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(drinks);
  });
};

exports.show = function(req, res) {
  Drink.findById(req.params.id, function(err, drink) {
    if(err) { return handleError(res, err); }
    if(!drink) { return res.sendStatus(404); }
    return res.status(200).json(drink);
  });
};

exports.create = function(req, res) {
  Drink.create(req.body, function(err, drink) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(drink);
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Drink.findById(req.params.id, function(err, drink) {
    if(err) { return handleError(res, err); }
    if(!drink) { return res.sendStatus(404); }
    var updated = _.merge(drink, req.body);
    updated.save(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(drink);
    });
  });
};

exports.destroy = function(req, res) {
  Drink.findById(req.params.id, function(err, drink) {
    if(err) { return handleError(res, err); }
    if(!drink) { return res.sendStatus(404); }
    drink.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.sendStatus(500, err);
}