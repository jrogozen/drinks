'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var sandbox;

var mongoose = require('mongoose');
var server = require('../../server/app');
var request = require('supertest');

describe('Activities API', function() {

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('GET /api/activities', function() {
    it('responds with JSON array', function(done) {
      var activities = [{name: 'flip cup'}, {name: 'beer pong'}];

      sandbox.stub(mongoose.Model, 'find').yields(null, activities);

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

      sandbox.stub(mongoose.Model, 'findById').yields(null, activity);

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

  describe('POST /api/activities', function() {
    it('returns the new activity', function(done) {
      var activity = {name: 'beer pong', videos: [1,2,3], description: 'cool game'};

      sandbox.stub(mongoose.Model, 'create').yields(null, activity);

      request(server)
        .post('/api/activities')
        .expect(201)
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

});






