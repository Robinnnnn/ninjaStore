'use strict';
var mongoose = require('mongoose');
var Review = mongoose.model('Review');

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
    photos: {
        type: Array
    },
    categories: {
        type: Array
    },
    // input: reviews, likes, wish list, etc.
    // helpful for building recommendation engine down the line
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

Item.statics.search = function(query) {
    var queries = query.split(" ").join('|');
    var queryMatch = new RegExp(queries, 'ig');
    return this.find({
        name: queryMatch
    })
}

Item.statics.getCategory = function(category) {
    return this.find({
        categories: {
            $elemMatch: {
                $in: [category]
            }
        }
    })
}

Item.statics.getAllCategories = function() {
  return this.find({})
    .distinct('categories')
    .exec()
}

Item.methods.getAllReviews = function() {
    var self = this;
    return Review.find({
            _id: {
                $in: self.reviews
            }
        })
        .populate('userId', 'email')
        .exec()
}

mongoose.model('Item', Item);
