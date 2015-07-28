// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Item = mongoose.model('Item');

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

	// describe('Unauthenticated request', function() {

	// 	var guestAgent;

	// 	beforeEach('Create guest agent', function() {
	// 		guestAgent = supertest.agent(app);
	// 	});

	// 	it('should get a 401 response', function(done) {
	// 		guestAgent.get('/api/members/secret-stash')
	// 			.expect(401)
	// 			.end(done);
	// 	});

	// });

	describe('Item request', function() {

		var loggedInAgent;
		var itemId;
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
    	var itemPost = {
        name: "Dragon",
	        description: {
	            short: "Razor sharp!",
	            long: "Razor sharp edges and constructed from high quality AUS-6 steel."
	        },
	        price: 999.99,
	        quantity: 0,
	        photo: "http://allninjagear.com/content/images/thumbs/0000256_flying-dragon-throwing-star_360.jpeg",
	        categories: ["Stars"]
    	};

		beforeEach('Create a item', function(done) {
			Item.create(itemInfo)
				.then(function(item){
					itemId = item._id;
					done();

				})
		});
		// beforeEach('Create a ite', function(done) {
		// 	Item.create(itemInfo, done);
		// });

		beforeEach('Create item agent', function(done) {
			itemAgent = supertest.agent(app);
			done();
			// itemAgent.post('/login').send(userInfo).end(done);
		});

		it('should get with 200 response and with an array of all items as the body', function(done) {
			itemAgent.get('/api/items/').expect(200).end(function(err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});
		it('should get single item with 200 response and single item as the body', function(done) {
			itemAgent.get('/api/items/'+itemId).expect(200).end(function(err, response) {
				if (err) return done(err);
				expect(response.body.name).to.be.equal("Flying Dragon");
				done();
			});
		});

		it('should post single item with 201 response and item as body', function(done) {
			itemAgent.post('/api/items/create')
					 .send(itemPost)
					 .expect(201)
					 .end(function(err, response) {
						if (err) return done(err);
						expect(response.body.name).to.be.equal("Dragon");
						done();
					  });
		});

		it('should put item with 200 response and single item as the body', function(done) {
			itemAgent.put('/api/items/edit/'+itemId)
					 .send({name:'Flying Dragon Change'})
					 .expect(200)
					 .end(function(err, response) {
						if (err) return done(err);
						expect(response.body.name).to.be.equal("Flying Dragon Change");
						done();
					 });
		});

		it('should delete item with 204 response and success message as body', function(done) {
			itemAgent.delete('/api/items/delete/'+itemId)
					 .expect(204)
					 .end(function(err, response) {
						if (err) return done(err);
						// expect(response).to.be.equal(null);
						Item.findById(itemId,function(err,item){
							if(err) return done(err);
							expect(item).to.be.null;
							done();
						})
					 });
		});
	});
});