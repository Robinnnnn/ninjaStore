'use strict';
var mongoose = require('mongoose');

var Review = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  }

});

Review.virtual('created').get(function() {
  if (this["_created"]) return this["_created"];
  return this["_created"] = this._id.getTimestamp();
})

Review.path('review').validate(function(v) {
  return v.length > 10;
})

Review.statics.getReviewByUser = function(userId) {
    return this.find({
        userId: userId
    }).populate({path:'itemId._id',select:'name description photos categories'}).exec()
}



mongoose.model('Review', Review);