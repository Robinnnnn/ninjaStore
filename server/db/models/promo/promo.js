'use strict';
var mongoose = require('mongoose');

var Promo = new mongoose.Schema({
    promoCode:String,
    createdDate:Date,
    expires:Date,
    validItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    validCategories:[String]
});

// Order.virtual('created').set(function() {
//     if(!this._created) {
//         this._created = this._id.getTimestamp();
//     } 
// })

// Order.methods.updateOrderState = function(state) {
//     this.orderState = state;
// }

// Order.methods.setTimeCreated = function(){
//     this._created = this._id.getTimestamp();
// }

// Order.statics.getOrdersByUser = function(userId) {
//     return this.find({
//         userId: userId
//     }).populate({path:'items._id',select:'name description photos categories'}).exec()
//         .then(function(orders){
//             return orders.map(function(order){
//                 order.setTimeCreated();
//                 return order;
//             })
//         })
// }

mongoose.model('Promo', Promo);