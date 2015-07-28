'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Review = mongoose.model('Review')

router.param('id', function (req, res, next, id) {
	Review.findById(id).exec()
	.then(function (review) {
		if (!review) throw HttpError(404);
		else {
			req.requestedReview = review;
			next();
		}
	})
	.then(null, next);
});

router.post('/', function(req, res, next) {
  Review.create(req.body)
    .then(function(review) {
      res.status(201).json(review)
    })
    .then(null, next)
})

router.put('/:id', function(req, res, next) {
  _.extend(req.requestedReview, req.body);
	req.requestedReview.save()
	.then(function (review) {
		res.json(review);
	})
	.then(null, next);
})

router.delete('/:id', function(req, res, next) {
  req.requestedReview.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
})
