const { required, string } = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],
    shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phone: { type: Number, required: true }
    },
    totalAmount: { type: Number, required: true },
    orderStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Order', orderSchema) 