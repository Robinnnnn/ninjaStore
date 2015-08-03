'use strict';
var router = require('express').Router();
module.exports = router;

// middleware for getting current order information
router.use('/', function(req, res, next) {
  if (req.session.cart) return next()
  req.session.cart = {}
  next()
})

// get current order information
router.get('/', function(req, res, next) {
  res.status(200).json(req.session.cart)
})

// post to current order
router.post('/', function(req, res, next) {
  if (req.session.cart.items) {
    req.session.cart.items.push(req.body)
    res.status(200).json(req.body)
  } else {
    req.session.cart.items = [req.body]
    res.status(200).json(req.body)
  }
})

router.delete('/', function(req, res, next) {
  req.session.cart = {}
  res.status(200).json(req.session.cart)
})

router.put('/:id', function(req, res, next){
  req.session.cart.items = req.session.cart.items.filter(function(elem){
    return !(elem._id === req.params.id);
  });

  res.status(200).json(req.body);
});
