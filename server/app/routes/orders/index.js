'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Order = mongoose.model('Order')
var stripe = require("stripe")("sk_test_LQOqO4gkY9p9P00jfSw8nQPc");
var emailer = require('./../../utils/email.js');

var bool = false;
var emailTrue = function(bool, func, to_name, to_email, subject, message_html){
    if(bool) {
        func(to_name, to_email, subject, message_html);
    }
};

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
            if (req.user) req.user.orders.push(order);
            req.user.save().then(function() {
                var buffer = "Your item order consists of: \n\r";
                for(var i = 0; i < req.body.items.length; i++){
                    buffer += "" + req.body.items[i].quantity + " " + req.body.items[i].name + " for " + req.body.items[i].price + "\n";
                }
                emailTrue(bool,emailer(req.user.name, req.user.email, "Your order is confirmed!  Get ready to fight some pirates.", buffer));
                res.status(201).json(order)
            });
        })
        .then(null, next)
})

// AUTH >>> Current User or Admin
router.get('/:id', function(req, res, next) {
    res.status(200).json(req.order);
})

router.get('/:id/charge', function(req, res, next) {
    // res.status(200).json(req.order);
    var stripeToken = request.body.stripeToken;

    var charge = stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      source: stripeToken,
      description: "Example charge"
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        // The card has been declined
      }
      res.status(200).json(charge);
    });
})

// AUTH >>> Current User or Admin
// consider using order.updateOrderState() method
router.put('/:id', function(req, res, next) {
    for (var key in req.body) {
        req.order[key] = req.body[key];
    }
    req.order.save().then(function(order) {
        var buffer = "Your order has changed: \n\r";
        for(var i = 0; i < req.body.items.length; i++){
            buffer += "" + req.body.items[i].quantity + " " + req.body.items[i].name + " for " + req.body.items[i].price + "\n";
        }
        emailTrue(bool,emailer(req.user.name, req.user.email, "Your order is confirmed!  Get ready to fight some pirates.", buffer));

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