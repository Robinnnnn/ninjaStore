// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Review = mongoose.model('Review');
var Item = mongoose.model('Item');
var User = mongoose.model('User');


var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Reviews Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

  var guestAgent;
  var user;
  var item;

	beforeEach('Create guest agent', function (done) {
		guestAgent = supertest.agent(app);
      User.create({
         name: 'Pat Will',
         email: 'pat@will.ninja',
         password: 'ninja'
       }).then(function(newUser){
         user = newUser;
        //  console.log(Item.findOne({}));
         return Item.create({
           name: "Some sweet throwing stars",
           price: 14.99
         })
       }).then(function(newItem){
         item = newItem;
         done();
       }, done)
	});

  describe('/ POST', function() {

    it('create a new review', function(done) {
      guestAgent.post('/api/reviews')
    	  .send({
          userId: user._id,
    			itemId: item._id,
    			review: 'This was awesome, but it broke!',
          rating: 1
    		})
    		.expect(201)
    		.end(function (err, res) {
    			if (err) return done(err);
          expect(res.body._id).to.be.ok;
    			expect(res.body.userId).to.equal(user._id.toString());
          expect(res.body.itemId).to.equal(item._id.toString());
    			done();
    		});
    })
  })

  describe('/:id PUT', function() {

    var review;

  	beforeEach('Create test review', function (done) {
      Review.create({
         review:"blah blah blah blah",
         itemId: item._id,
         userId: user._id,
         rating: 2
      })
      .then(function(newReview){
        review = newReview;
        done();
      }, done)
    })

    it('edits review with specified id', function(done) {
      guestAgent.put('/api/reviews/' + review._id)
      .send({
        rating: 5
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        expect(res.body._id).to.equal(review._id.toString())
        expect(res.body.rating).to.not.equal(review.rating)
        done()
      })
    })
  })

  describe('/:id DELETE', function() {

    var review;

  	beforeEach('Create test review', function (done) {
      Review.create({
         review:"blah blah blah blah",
         itemId: item._id,
         userId: user._id,
         rating: 2
      })
      .then(function(newReview){
        review = newReview;
        done();
      }, done)
    })

    it('delete review with specified id', function(done) {
      guestAgent.delete('/api/reviews/' + review._id)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err)
        Review.findById(review._id, function(err, review) {
          if (err) return done(err)
          expect(review).to.be.null
          done()
        })
      })
    })
  })

  // come back when user login is working
  // describe('/me GET', function() {
  //
  //   beforeEach('Create test user', function(done) {
  //     User.create({
  //       name: 'Pat Will',
  //       email: 'pat@will.ninja',
  //       password: 'ninja'
  //     }, done)
  //   })
  //
  //   it('gets the currently logged in user', function(done) {
  //     guestAgent.get('/api/users/me')
  //       .expect(200)
  //       .end(function(err, res) {
  //         if (err) return done(err)
  //         expect(res.body)
  //       })
  //   })
  // })
/*
  describe('/:id GET', function() {

    var user

    beforeEach('Create test user', function(done) {
      User.create({
        name: 'Pat Will',
        email: 'pat@will.ninja',
        password: 'ninja'
      })
      .then(function(newUser) {
        user = newUser
        done()
      })
    })

    it('gets user with specified id', function(done) {
      guestAgent.get('/api/users/' + user._id)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        expect(res.body.name).to.equal(user.name)
        done()
      })
    })
  })

  describe('/:id PUT', function() {

    var user

    beforeEach('Create test user', function(done) {
      User.create({
        name: 'Pat Will',
        email: 'pat@will.ninja',
        password: 'ninja'
      })
      .then(function(newUser) {
        user = newUser
        done()
      })
    })

    it('edits user with specified id', function(done) {
      guestAgent.put('/api/users/' + user._id)
      .send({
        name: 'Greg Thang'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        expect(res.body._id).to.equal(user._id.toString())
        expect(res.body.name).to.not.equal(user.name)
        done()
      })
    })
  })

  describe('/:id DELETE', function() {

    var user

    beforeEach('Create test user', function(done) {
      User.create({
        name: 'Pat Will',
        email: 'pat@will.ninja',
        password: 'ninja'
      })
      .then(function(newUser) {
        user = newUser
        done()
      })
    })

    it('delete user with specified id', function(done) {
      guestAgent.delete('/api/users/' + user._id)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err)
        User.findById(user._id, function(err, user) {
          if (err) return done(err)
          expect(user).to.be.null
          done()
        })
      })
    })
  })

*/
});
