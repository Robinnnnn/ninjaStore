'use strict';
var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    sessionId:String,
    items:[{
        id:{type:mongoose.Schema.Types.ObjectId,ref:'Item'},
        price:Number,
        quantity:Number
    }]
});

Order.virtual('created').get(function() {
	if (this["_created"]) return this["_created"];
	return this["_created"] = this._id.getTimestamp();
})

mongoose.model('Order', Order);
