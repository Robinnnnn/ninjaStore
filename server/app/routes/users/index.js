'use strict';

var router = require('express').Router(),
	_ = require('lodash'),
	mongoose = require('mongoose')

var HttpError = require('../../utils/HttpError');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');

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
	Order.getOrdersByUser(req.params.id).then(function(orders) {
		orders = orders.map(function(order){
			order = order.toObject();
			order.items = order.items.map(function(order){
				var temp = order._id;
				temp.price = order.price;
				temp.quantity = order.quantity;
				return temp;		
			})
			return order;	
		})
		res.json(orders);
	})
})
router.get('/:id/getReviews', function(req, res, next) {
	Review.getReviewByUser(req.params.id).then(function(reviews){
		res.json(reviews);
	})
})

// Current User Or Admin
router.use('/:id', function(req, res, next) {
	if (req.user._id.toString() == req.requestedUser._id.toString() || req.user.isAdmin) return next()
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
