const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    customerInfo: {
        name: String,
        email: String,
        address: {
            street: String,
            city: String,
            country: String
        }
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    shippingInfo: {
        tracking: String,
        carrier: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
