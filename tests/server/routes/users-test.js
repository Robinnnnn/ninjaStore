// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

  var guestAgent;

  var loggedInAgent;

  var userInfo = {
     email: 'joe@gmail.com',
     password: 'shoopdawoop',
     isAdmin: true
   };

   var adminUser;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
  });

   beforeEach('Create a user', function (done) {
     User.create(userInfo)
     .then(function(newAdminUser){
        adminUser = newAdminUser;
        done();
     });
   });


 beforeEach('Create loggedIn user agent and authenticate', function (done) {
   loggedInAgent = supertest.agent(app);
   loggedInAgent.post('/login').send(userInfo).end(done);
 });


  describe('/ GET', function() {

    it('should get a 200 response', function(done) {
      loggedInAgent.get('/api/users')
        .expect(200)
        .end(done)
    })

    it('should return users as json', function(done) {
      loggedInAgent.get('/api/users')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body).to.be.instanceof(Array)
          done()
        })
    })
  })

  describe('/ POST', function() {

    it('create a new user', function(done) {
      guestAgent.post('/api/users')
    	  .send({
          name: 'Pat Will',
    			email: 'pat@will.ninja',
    			password: 'ninja'
    		})
    		.expect(201)
    		.end(function (err, res) {
    			if (err) return done(err);
    			expect(res.body.name).to.equal('Pat Will');
    			createdUser = res.body;
    			done();
    		});
    })
  })


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

    it('edits user with specified id', function(done) {
      loggedInAgent.put('/api/users/' + adminUser._id)
      .send({
        name: 'Greg Thang'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        expect(res.body._id).to.equal(adminUser._id.toString())
        expect(res.body.name).to.not.equal(adminUser.name)
        done()
      })
    })
  })

  describe('/:id DELETE', function() {
    it('delete user with specified id', function(done) {
      loggedInAgent.delete('/api/users/' + adminUser._id)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err)
        User.findById(adminUser._id, function(err, user) {
          if (err) return done(err)
          expect(user).to.be.null
          done()
        })
      })
    })
  })

});
