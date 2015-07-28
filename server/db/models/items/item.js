'use strict';
var mongoose = require('mongoose');

var Item = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    description: {
        short: {
            type: String
        },
        long: {
            type: String
        }
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
    reviews: {
      type: Array,
      ref: 'Review'
      default: []
    }
});

Item.statics.getCategory = function(category) {
    return this.find({
        categories: {
            $elemMatch: {
                $in: [category]
            }
        }
    })
}

mongoose.model('Item', Item);