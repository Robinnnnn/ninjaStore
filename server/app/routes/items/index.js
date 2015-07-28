'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Item = mongoose.model('Item')

router.get('/', function(req, res, next) {
    Item.find({}).exec()
        .then(function(items) {
            res.json(items)
        })
        .then(null, next)
});

// we could just use filter instead of unique routes
router.get('/category/:name', function(req, res, next) {
    Item.getCategory(req.params.name).exec()
        .then(function(items) {
            res.json(items)
        })
        .then(null, next)
})