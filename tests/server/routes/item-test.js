// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Items Route', function() {

	beforeEach('Establish DB connection', function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function(done) {
		clearDB(done);
	});

	describe('Item request', function() {
		var itemId;
		var itemInfo = {
			name: "Flying Dragon",
			description: {
				short: "Razor sharp!",
				long: "Razor sharp edges and constructed from high quality AUS-6 steel. This throwing star features a dragon in which the wings are the silver lined blade edges. Includes pouch. Measures 3 3/4″ diameter."
			},
			price: 99.99,
			quantity: 200,
			photos: ["http://allninjagear.com/content/images/thumbs/0000256_flying-dragon-throwing-star_360.jpeg"],
			categories: ["Throwing Stars"]
		};
		var itemPost = {
			name: "Dragon",
			description: {
				short: "Razor sharp!",
				long: "Razor sharp edges and constructed from high quality AUS-6 steel."
			},
			price: 999.99,
			quantity: 0,
			photos: ["http://allninjagear.com/content/images/thumbs/0000256_flying-dragon-throwing-star_360.jpeg"],
			categories: ["Stars"]
		};

		beforeEach('Create a item', function(done) {
			Item.create(itemInfo)
				.then(function(item) {
					itemId = item._id;
					done();

				})
		});

		describe('standard user', function() {
			var userInfo = {
				email: 'thang@gmail.com',
				password: '123'
			};

			beforeEach('Create a normal user', function(done) {
				User.create(userInfo, done);
			});

			beforeEach('Create item agent', function(done) {
				userAgent = supertest.agent(app);
				userAgent.post('/login').send(userInfo).end(done);
			});

			it('should get with 200 response and with an array of all items as the body', function(done) {
				userAgent.get('/api/items/').expect(200).end(function(err, response) {
					if (err) return done(err);
					expect(response.body).to.be.an('array');
					done();
				});
			});
			it('should get single item with 200 response and single item as the body', function(done) {
				userAgent.get('/api/items/' + itemId).expect(200).end(function(err, response) {
					if (err) return done(err);
					expect(response.body.name).to.be.equal("Flying Dragon");
					done();
				});
			});
			it('should not allow unauthorized user to make change to item', function(done) {
				userAgent.post('/api/items')
					.send(itemPost)
					.expect(401)
					.end(done);
			});
		})

		describe('admin testing', function() {
			var adminAgent;

			var adminInfo = {
				email: 'robin@gmail.com',
				password: '123',
				isAdmin: true
			};
			beforeEach('Create a admin user', function(done) {
				User.create(adminInfo, done);
			});

			beforeEach('Create admin user agent and authenticate', function(done) {
				adminAgent = supertest.agent(app);
				adminAgent.post('/login').send(adminInfo).end(done);
			});

			it('should post single item with 201 response and item as body', function(done) {
				adminAgent.post('/api/items')
					.send(itemPost)
					.expect(201)
					.end(function(err, response) {
						if (err) return done(err);
						expect(response.body.name).to.be.equal("Dragon");
						done();
					});
			});


			it('should put item with 200 response and single item as the body', function(done) {
				adminAgent.put('/api/items/' + itemId)
					.send({
						name: 'Flying Dragon Change'
					})
					.expect(200)
					.end(function(err, response) {
						if (err) return done(err);
						expect(response.body.name).to.be.equal("Flying Dragon Change");
						done();
					});
			});

			it('should delete item with 204 response and success message as body', function(done) {
				adminAgent.delete('/api/items/' + itemId)
					.expect(204)
					.end(function(err, response) {
						if (err) return done(err);
						// expect(response).to.be.equal(null);
						Item.findById(itemId, function(err, item) {
							if (err) return done(err);
							expect(item).to.be.null;
							done();
						})
					});
			});


		})

	});
});