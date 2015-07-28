'use strict';

var router = require('express').Router(),
		_ = require('lodash'),
		mongoose = require('mongoose')

// var HttpError = require('../../utils/HttpError');
// var Auth = require('../../utils/auth.middleware');
var User = mongoose.model('User');

router.param('id', function (req, res, next, id) {
	User.findById(id).exec()
	.then(function (user) {
		if (!user) throw HttpError(404);
		else {
			req.requestedUser = user;
			next();
		}
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	User.find({}).exec()
	.then(function (users) {
		res.json(users);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		res.status(201).json(user);
	})
	.then(null, next);
});

router.get('/me', function (req, res, next) {
	res.json(req.user);
});

router.get('/:id', function (req, res, next) {
	res.status(200).json(req.requestedUser)
});

// router.use('/:id', Auth.isAuthenticated, function (req, res, next) {
// 	if (req.requestedUser._id == req.user._id) next();
// 	else Auth.isAdmin(req, res, next);
// });

router.put('/:id', function (req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;
