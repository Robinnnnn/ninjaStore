'use strict';
var router = require('express').Router();
module.exports = router;

// middleware for getting current order information
router.use('/', function(req, res, next) {
  if (req.cart) return next()
  req.cart = {}
  next()
})

// get current order information
router.get('/', function(req, res, next) {
  res.status(200).json(req.cart)
})

// post to current order
router.post('/', function(req, res, next) {
  if (req.cart.items) {
    req.cart.items.push(req.body)
    console.log(req.cart);
    res.status(200).json(req.body)
  } else {
    req.cart.items = [req.body]
    console.log(req.cart);
    res.status(200).json(req.body)
  }
})
