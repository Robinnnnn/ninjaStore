'use strict';
var router = require('express').Router();
module.exports = router;

// middleware for getting current order information
router.use('/', function(req, res, next) {
  console.log(req.body);
  if (req.cart) return next()
  req.cart = {}
  res.status(201).json(req.cart)
})

// get current order information
router.get('/', function(req, res, next) {
  res.status(200).json(req.cart)
})

// post to current order
router.post('/', function(req, res, next) {
  console.log(req.body);
  if (req.cart.items) {
    req.cart.items.push(req.body)
    res.status(200).json(req.body)
  } else {
    req.cart.items = [req.body]
    res.status(200).json(req.body)
  }
})
