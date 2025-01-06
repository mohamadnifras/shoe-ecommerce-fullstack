const asyncHandler = require('../middlewares/asyncHandler');
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

//AllOrders
exports.getAllOrders = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const allOrder = await orderService.allOrderService(page, limit);

    res.status(201).json(allOrder)  
})



//Admin userOrder
exports.getUserOrderById = asyncHandler(async(req,res)=>{
    const {userId} = req.params;
    const userOrder = await orderService.userOrderService(userId)

    res.status(201).json(userOrder)
})




