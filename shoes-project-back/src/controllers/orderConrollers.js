const asyncHandler = require('../middlewares/asyncHandler');
const orderService = require('../services/orderService')

//add to order
exports.addOrder = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {shippingAddress} = req.body;
    const  saveOrder = orderService.createOrder({userId,shippingAddress});

    res.status(201).json({
        message: "Order place successfully",
    saveOrder,
    })
})

// get user order


