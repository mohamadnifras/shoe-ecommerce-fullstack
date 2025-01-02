const asyncHandler = require('../middlewares/asyncHandler');
const user = require('../models/userModel');
const orderService = require('../services/orderService')

//add to order
exports.addOrder = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {shippingAddress} = req.body;
    const  saveOrder = await orderService.createOrder({userId,shippingAddress});

    res.status(201).json({
        message: "Order place successfully",
    saveOrder,
    })
})

// get user order
exports.getUserOrder = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {page, limit} = req.query
    const orders = await orderService.getOrders({userId, page, limit})

    res.status(201).json({
        message:"Orders success",orders
    })
})



