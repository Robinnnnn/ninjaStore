// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Order Route', function() {

	beforeEach('Establish DB connection', function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function(done) {
		clearDB(done);
	});

	describe('Order request', function() {
		var itemInfo = {
			name: "Flying Dragon",
			description: {
				short: "Razor sharp!",
				long: "Razor sharp edges and constructed from high quality AUS-6 steel. This throwing star features a dragon in which the wings are the silver lined blade edges. Includes pouch. Measures 3 3/4″ diameter."
			},
			price: 99.99,
			quantity: 200,
			photo: "http://allninjagear.com/content/images/thumbs/0000256_flying-dragon-throwing-star_360.jpeg",
			categories: ["Throwing Stars"]
		};

		beforeEach('Create an item', function(done) {
			Item.create(itemInfo)
				.then(function(item) {
					// itemId = item._id;
					done();
				})
		});

		var orderId;
		var orderInfo = {};
		var orderPost = {};

		var userInfo = {
			email: 'thang@gmail.com',
			password: '123'
		};

		beforeEach('Create a standard user', function(done) {
			User.create(userInfo, done);
		});

		beforeEach('Create an order', function(done) {
			User.findOne({})
				.then(function(user) {
					orderInfo.userId = user._id;
					orderPost.userId = user._id;
					return Item.findOne().exec();
				})
				.then(function(items) {
					orderInfo.items = items;
					orderPost.items = items;
					Order.create(orderInfo)
						.then(function(order) {
							orderId = order._id;
							done();
						})
				})
		})


		describe('standard user', function() {
			beforeEach('Create standard agent', function(done) {
				standardAgent = supertest.agent(app);
				standardAgent.post('/login').send(userInfo).end(done);
			});


			it('should post single order with 201 response and order as body', function(done) {
				standardAgent.post('/api/orders/')
					.send(orderPost)
					.expect(201)
					.end(function(err, response) {
						if (err) return done(err);
						expect(response.body.orderState).to.be.equal("Created");
						done();
					});
			});

			it('should get single order with 200 response and single order as the body', function(done) {
				standardAgent.get('/api/orders/' + orderId).expect(200).end(function(err, response) {
					if (err) return done(err);
					expect(response.body._id).to.be.equal(orderId.toString());
					done();
				});
			});

			it('should put order with 200 response and single order as the body', function(done) {
				standardAgent.put('/api/orders/' + orderId)
					.send({
						orderState: 'Processing'
					})
					.expect(200)
					.end(function(err, response) {
						if (err) return done(err);
						expect(response.body.orderState).to.be.equal("Processing");
						done();
					});
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

			it('should get with 200 response and with an array of all order as the body', function(done) {
				adminAgent.get('/api/orders/').expect(200).end(function(err, response) {
					if (err) return done(err);
					expect(response.body).to.be.an('array');
					done();
				});
			});

			it('should delete order with 204 response and success message as body', function(done) {
				adminAgent.delete('/api/orders/' + orderId)
					.expect(204)
					.end(function(err, response) {
						if (err) return done(err);
						// expect(response).to.be.equal(null);
						Order.findById(orderId, function(err, order) {
							if (err) return done(err);
							expect(order).to.be.null;
							done();
						})
					});
			});
		})
	});
});