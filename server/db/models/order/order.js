'use strict';
var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sessionId: String,
    items: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        price: Number,
        quantity: Number
    }],
    orderState: {
        type: String,
        default: 'Created'
    }
});

Order.virtual('created').get(function() {
    if (this._created) return this._created;
    return this._created = this._id.getTimestamp();
})

Order.methods.updateOrderState = function(state) {
    if (state === 'Processing' || 'Cancelled' || 'Completed') {
        this.orderState = state;
        return 'Order is now ' + state + '.'
    } else {
        return new Error('invalid state!');
    }
}

mongoose.model('Order', Order);