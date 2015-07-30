'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Order = mongoose.model('Order')

router.param('id', function(req, res, next, id) {
    Order.findById(id).then(function(order) {
        if (order) {
            req.order = order;
            // console.log('res.user:', req.user._id.toString())
            // console.log('req.order:', req.order.userId.toString())
            if (req.order.userId.toString() === req.user._id.toString() || req.user.isAdmin) return next()
            res.status(401).end()
        } else {
            throw Error('order not found')
        }
    }).then(null, next)
})

// AUTH >>> ADMIN
router.get('/',
    function(req, res, next) {
        if (req.user.isAdmin) return next()
        res.status(401).end()
    },
    function(req, res, next) {
        Order.find({}).exec()
            .then(function(orders) {
                res.json(orders)
            })
            .then(null, next);
    }
);

// AUTH >>> Everyone
router.post('/', function(req, res, next) {
    Order.create(req.body)
        .then(function(order) {
            if(req.user) req.user.orders.push(order);
            res.status(201).json(order)
        })
        .then(null, next)
})

// AUTH >>> Current User or Admin
router.get('/:id', function(req, res, next) {
    res.status(200).json(req.order);
})

// AUTH >>> Current User or Admin
// consider using order.updateOrderState() method
router.put('/:id', function(req, res, next) {
    for (var key in req.body) {
        req.order[key] = req.body[key];
    }
    req.order.save().then(function(order) {
        res.status(200).json(order);
    })
})

router.use(function(req, res, next) {
    if (req.user.isAdmin) return next();
    res.status(401).end();
})

// AUTH >>> Current User or Admin
router.delete('/:id', function(req, res, next) {
    req.order.remove()
        .then(function() {
            res.status(204).send({
                message: 'success!'
            });
        })
})
