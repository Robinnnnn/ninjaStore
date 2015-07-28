'use strict';
var mongoose = require('mongoose');

var Review = new mongoose.Schema({
    itemId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Item'
    },
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    review: {
    	type:String,
    	required:true
    },
    rating: {
      type: Number,
      min: 0, max: 5
    }

});

Review.path('review').validate(function(v){
	return v.length>10;
})

mongoose.model('Review', Review);