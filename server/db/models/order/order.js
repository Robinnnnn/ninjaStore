'use strict';
var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userInfo: {

        email: String,
        addressStreet: String,
        addressApt: String,
        name: String,
        city: String,
        state: String,
        zipcode: Number,
        country: String,
        phone: String
    },
    items: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        price: Number,
        quantity: Number
    }],
    orderState: {
        enum: ['Processing', 'Cancelled', 'Completed', 'Cart', 'Created'],
        type: String,
        default: 'Created'
    }
});

Order.virtual('created').get(function() {
    if (this._created) return this._created;
    this._created = this._id.getTimestamp();
    return;
})

Order.methods.updateOrderState = function(state) {
    this.orderState = state;
}

Order.statics.getOrdersByUser = function(userId) {
    return this.find({
        userId: userId
    }).populate({path:'items._id',select:'name description photos categories'}).exec()
}

mongoose.model('Order', Order);