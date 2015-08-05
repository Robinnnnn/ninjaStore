'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var _ = require('lodash');
var Promo = mongoose.model('Promo')

router.param('id', function(req, res, next, id) {
    Promo.findById(id).then(function(promo) {
        if (promo) {
            req.promo = promo;
            if (req.promo.userId.toString() === req.user._id.toString() || req.user.isAdmin) return next()
            res.status(401).end()
        } else {
            throw Error('promo not found')
        }
    }).then(null, next)
})

router.param('name', function(req, res, next, name) {
    Promo.findOne({promoCode:name}).then(function(promo) {
        if (promo) {
            req.promo = promo;
            next();
        } else {
            throw Error('promo not found')
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
        Promo.find({}).exec()
            .then(function(promos) {
                res.json(promos)
            })
            .then(null, next);
    }
);

// AUTH >>> Everyone
router.post('/', function(req, res, next) {
   
})

// AUTH >>> Current User or Admin
router.get('/:id', function(req, res, next) {
    res.status(200).json(req.promo);
})

router.get('/code/:name', function(req, res, next) {
    res.status(200).json(req.promo);
})


// AUTH >>> Current User or Admin
// consider using promo.updatepromoState() method
router.put('/:id', function(req, res, next) {
    
})

router.use(function(req, res, next) {
    if (req.user.isAdmin) return next();
    res.status(401).end();
})

// AUTH >>> Current User or Admin
router.delete('/:id', function(req, res, next) {
    req.promo.remove()
        .then(function() {
            res.status(204).send({
                message: 'success!'
            });
        })
})