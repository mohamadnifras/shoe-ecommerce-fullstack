const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');
const Order = require('../models/orderModel');
const mongoose = require('mongoose')

const createOrder = async ({ userId, shippingAddress }) => {

    const existingOrder = await Order.findOne({ 'shippingAddress.email': shippingAddress.email });
    if (existingOrder) {
        throw new CustomError('An order with this email already exists.')
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart || !cart.items || cart.items.length === 0) {
        throw new CustomError('Cart is empty. Please Add item before placing an order.')
    }

    let totalAmount = 0;
    for (const cartItem of cart.items) {
        const product = await Product.findById(cartItem.productId);
        if (!product) {
            throw new CustomError('Product not found')
        }
        if (product.stock < cartItem.quantity) {
            throw new CustomError(`Insufficient quantity for ${product.name}`)
        }

        product.stock -= cartItem.quantity;
        await product.save();
        totalAmount += product.price * cartItem.quantity;
    }

    const newOrder = new Order({
        userId: userId,
        items: cart.items,
        shippingAddress,
        totalAmount,
    });

    const saveOrder = await newOrder.save();
    await Cart.findOneAndUpdate({ user: new mongoose.Types.ObjectId(userId) }, { $set: { items: [] } });
    return saveOrder

}








module.exports = { createOrder } 