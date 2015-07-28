'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Order = mongoose.model('Order')

router.get('/', function(req, res, next) {
    Order.find({}).exec()
        .then(function(orders) {
            res.json(orders)
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    Order.findById(id).then(function(order) {
        if (order) {
            req.order = order;
            next();
        } else {
            throw Error('order not found')
        }
    }).then(null, next)
})

router.get('/:id', function(req, res, next) {
    res.json(req.order);
})

router.post('/create', function(req, res, next) {
    Order.create(req.body)
        .then(function(order) {
            res.status(201).json(order)
        })
        .then(null, next)
})

router.put('/edit/:id', function(req, res, next) {
    for (var key in req.body) {
        req.order[key] = req.body[key];
    }
    req.order.save().then(function(order) {
        res.json(order);
    })
})

router.delete('/delete/:id', function(req, res, next) {
    req.order.remove()
        .then(function() {
            res.status(204).send({
                message: 'success!'
            });
        })
})

// // we could just use filter instead of unique routes
// router.get('/category/:name', function(req, res, next) {
//     Item.getCategory(req.params.name).exec()
//         .then(function(items) {
//             res.json(items)
//         })
//         .then(null, next)
// })