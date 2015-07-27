'use strict';
var mongoose = require('mongoose');

var Item = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    description: {
        short: { type: String },
        long: { type: String }
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        min: 0
    },
    photo: {
      type: String
    },
    categories: {
      type: Array
    },
    // input: reviews, likes, wish list, etc.
    // helpful for building recommendation engine down the line
    input: {
      type: Array
    },
    output: {
      type: Array
    }
});

mongoose.model('Item', Item);
