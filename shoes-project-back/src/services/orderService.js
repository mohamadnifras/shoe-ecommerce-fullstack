const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');
const Order = require('../models/orderModel');



//create order
const createOrder = async ({ userId, shippingAddress }) => {

    const cart = await Cart.findOne({ userId: userId });

    if (!cart || !cart.items || cart.items.length == 0) {
        throw new CustomError('Cart is empty. Please add items before placing an order.', 400);
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
    await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
    return saveOrder
}

//get user Oreders 

const getOrders = async ({ userId, page = 1, limit = 10 }) => {

    const skip = (page - 1) * limit
    const orders = await Order.find({ userId })
        .populate('items.productId')
        .skip(skip)
        .limit(limit)

    if (!orders.length) {
        throw new CustomError('No orders found for this user', 404)
    }
    return orders
}


//Admin All Order 
const allOrderService = async (page, limit) => {
    const skip = (page - 1)
    const allOrder = await Order.find().populate('items.productId').skip(skip).limit(limit)
    const totalOrder = await Order.countDocuments()
    return {
        allOrder,
        currentPage: page,
        totalPage: Math.ceil(totalOrder / limit),
        totalOrder
    };
};

//Admin userOrder 
const userOrderService = async (userId) => {
    const userOrder = await Order.find({ userId: userId }).sort({ createdAt: -1 }).populate('items.productId')
    if (!userOrder) {
        throw new CustomError('Order not fount', 404)
    }
    return { userOrder }
}










module.exports = { createOrder, getOrders, userOrderService,allOrderService }



