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
        .then(null, next);
});

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

router.get('/:id', function(req, res, next) {
    res.json(req.item);
})

router.post('/create', function(req, res, next) {
    Item.create(req.body)
        .then(function(item) {
            res.status(201).json(item)
        })
        .then(null, next)
})

router.put('/edit/:id', function(req, res, next) {
    for (var key in req.body) {
        req.item[key] = req.body[key];
    }
    req.item.save().then(function(item) {
        res.json(item);
    })
})

router.delete('/delete/:id', function(req, res, next) {
    req.item.remove()
        .then(function() {
            res.status(204).send({message:'success!'});
        })
})

router

// // we could just use filter instead of unique routes
// router.get('/category/:name', function(req, res, next) {
//     Item.getCategory(req.params.name).exec()
//         .then(function(items) {
//             res.json(items)
//         })
//         .then(null, next)
// })