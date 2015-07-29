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

  var item;
  var loggedInAgent;
  var adminUser;
  
  var userInfo = {
     email: 'joe@gmail.com',
     password: 'shoopdawoop',
     isAdmin: true
   };


  beforeEach('Create a user', function (done) {
     User.create(userInfo)
     .then(function(newAdminUser){
        adminUser = newAdminUser;
        return Item.create({
           name: "Some sweet throwing stars",
           price: 14.99
         });
       }).then(function(newItem){
         item = newItem;
         done();
       }, done);
   });


 beforeEach('Create loggedIn user agent and authenticate', function (done) {
   loggedInAgent = supertest.agent(app);
   loggedInAgent.post('/login').send(userInfo).end(done);
 });

  var review;

  beforeEach('Create test review', function (done) {
    Review.create({
       review:"blah blah blah blah",
       itemId: item._id,
       userId: adminUser._id,
       rating: 2
    })
    .then(function(newReview){
      review = newReview;
      done();
    }, done);
  });


  describe('/ POST', function() {

    it('create a new review', function(done) {
      loggedInAgent.post('/api/reviews')
    	  .send({
          userId: adminUser._id,
    			itemId: item._id,
    			review: 'This was awesome, but it broke!',
          rating: 1
    		})
    		.expect(201)
    		.end(function (err, res) {
    			if (err) return done(err);
          expect(res.body._id).to.be.ok;
    			expect(res.body.userId).to.equal(adminUser._id.toString());
          expect(res.body.itemId).to.equal(item._id.toString());
    			done();
    		});
    });
  });

  describe('/:id PUT', function() {

    it('edits review with specified id', function(done) {
      loggedInAgent.put('/api/reviews/' + review._id)
      .send({
        rating: 5
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body._id).to.equal(review._id.toString());
        expect(res.body.rating).to.not.equal(review.rating);
        done();
      });
    });
  });

  describe('/:id DELETE', function() {

    it('delete review with specified id', function(done) {
      loggedInAgent.delete('/api/reviews/' + review._id)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        Review.findById(review._id, function(err, review) {
          if (err) return done(err);
          expect(review).to.be.null;
          done();
        });
      });
    });
  });

});
