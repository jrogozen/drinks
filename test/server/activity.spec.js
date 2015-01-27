'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose');

var server = require('../../server/app');
var request = require('supertest');

describe('GET /api/activities', function() {
  it('responds with JSON array', function(done) {
    var activities = [{name: 'flip cup'}, {name: 'beer pong'}];

    sinon.stub(mongoose.Model, 'find').yields(null, activities);

    request(server)
      .get('/api/activities')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) throw err;
        expect(res.body).to.exist
        expect(res.body.length).to.equal(2)
        expect(res.body).to.be.an('array')
        done();
      });
  });
});

describe('GET /api/activities/:id', function() {
  it('responds with JSON activity', function(done) {
    var activity = {name: 'beer pong', wikiLink: 'http://google.com', videos: ['1234', '3456'], description: "cool game"};

    sinon.stub(mongoose.Model, 'findById').yields(null, activity);

    request(server)
      .get('/api/activities/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) throw err;
        expect(res.body).to.exist
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.exist
        expect(res.body.videos).to.be.an('array')
        done();
      });
  });
});