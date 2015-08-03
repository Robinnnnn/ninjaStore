'use strict';

var router = require('express').Router(),
	_ = require('lodash'),
	mongoose = require('mongoose')

var HttpError = require('../../utils/HttpError');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.param('id', function(req, res, next, id) {
	User.findById(id).exec()
		.then(function(user) {
			if (!user) throw HttpError(404);
			else {
				req.requestedUser = user;
				next();
			}
		})
		.then(null, next);
});

router.get('/',
	function(req, res, next) {
		if (req.user.isAdmin) return next()
		res.status(401).end()
	},
	function(req, res, next) {
		User.find({}).exec()
			.then(function(users) {
				res.json(users);
			})
			.then(null, next);
	}
);

// Everyone
router.get('/:id', function(req, res, next) {
	res.status(200).json(req.requestedUser)
});

router.post('/', function(req, res, next) {
	User.create(req.body)
		.then(function(user) {
			res.status(201).json(user);
		})
		.then(null, next);
});

router.get('/:id/getOrders', function(req, res, next) {
	// req.user.getAllOrders()
	// 	.then(function(user) {
	// 		console.log('go here')
	// 		console.log(user)
	// 		console.log(user.orders)
	// 		res.json(user.orders);
	// 		// var items = user.map(function(user){return})
	// 	})
	Order.getOrdersByUser(req.params.id).then(function(orders) {
		console.log(orders);
		res.json(orders);
	})
})

router.get('/:id/getReviews', function(req, res, next) {
	req.user.getAllReviews()
		.then(function(user) {
			// console.log(user)
			res.json(req.user.reviews);
		})
})

// Current User Or Admin
router.use('/:id', function(req, res, next) {
	if (req.user._id == req.requestedUser._id || req.user.isAdmin) return next()
	res.status(401).end()
})

router.put('/:id', function(req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
		.then(function(user) {
			res.json(user);
		})
		.then(null, next);
});

router.delete('/:id', function(req, res, next) {
	req.requestedUser.remove()
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});



module.exports = router;