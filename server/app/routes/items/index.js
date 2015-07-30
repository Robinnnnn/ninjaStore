'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Item = mongoose.model('Item')

router.param('id', function(req, res, next, id) {
    Item.findById(id).then(function(item) {
        if (item) {
            req.item = item;
            next();
        } else {
            throw Error('item not found')
        }
    }).then(null, next)
})

router.get('/categories', function(req, res, next) {
  Item.getAllCategories()
    .then(function(categories) {
      res.status(200).json(categories)
    })
    .then(null, next)
})

// AUTH >>> Everyone
router.get('/', function(req, res, next) {
  console.log('hitting route');
    Item.find({}).exec()
        .then(function(items) {
            res.json(items)
        })
        .then(null, next);
});

// AUTH >>> Everyone
router.get('/search/:query', function(req, res, next) {
    Item.search(req.params.query).exec()
        .then(function(items) {
            res.status(200).json(items)
        })
        .then(null, next)
})

router.get('/show/:category', function(req, res, next) {
  Item.getCategory(req.params.category)
    .exec()
    .then(items => {
      res.status(200).json(items)
    })
    .then(null, next)
})

// AUTH >>> Everyone
router.get('/:id', function(req, res, next) {
    req.item.getAllReviews()
        .then(function(reviews){
            req.item = req.item.toObject();
            req.item.reviews = reviews;
            res.json(req.item);
        })
})

// AUTH >>> Admin
router.use(function(req, res, next) {
    if (req.user.isAdmin) return next()
    res.status(401).end()
})

router.post('/', function(req, res, next) {
    Item.create(req.body)
        .then(function(item) {
            res.status(201).json(item)
        })
        .then(null, next)
})

router.put('/:id', function(req, res, next) {
    for (var key in req.body) {
        req.item[key] = req.body[key];
    }
    req.item.save().then(function(item) {
        res.json(item);
    })
})

router.delete('/:id', function(req, res, next) {
    req.item.remove()
        .then(function() {
            res.status(204).send({
                message: 'success!'
            });
        })
})
