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