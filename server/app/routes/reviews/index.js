'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Review = mongoose.model('Review')

router.post('/', function(req, res, next) {
  Review.create(req.body)

})

router.put()

router.delete()
