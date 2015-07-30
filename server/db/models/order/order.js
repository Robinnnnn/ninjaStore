'use strict';
var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userInfo: {
        email: String,
        address: String
    },
    items: [{
        id: {
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
    return this._created = this._id.getTimestamp();
})

Order.methods.updateOrderState = function(state) {
    this.orderState = state;
}

mongoose.model('Order', Order);