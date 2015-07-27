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


mongoose.model('Order', Order);
