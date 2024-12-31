const asyncHandler = require('../middlewares/asyncHandler');
const cartSevice = require('../services/CartService')

// addCart
exports.addToCart = asyncHandler(async (req, res) => {
   
    
    const userId = req.user._id
    const {productId} = req.params;
    const cart = await cartSevice.addProductToCart({ userId, productId });

    res.status(200).json({
        success: true,
        message: 'Product added to cat successfully🛒',
        cart,
    });
});

//get allCart
exports.getCart = asyncHandler(async(req, res)=> {


    const userId = req.user._id

    const {page = 1, limit = 10} = req.query
    
    const allCart = await cartSevice.getCartService({userId, page, limit});


    res.status(200).json({allCart})
})


//delete item cart

exports.deletedCart = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {productId} = req.params;
    const updateCart = await cartSevice.deletedService({userId, productId})

    res.status(200).json({message:"product remove the cart", updateCart})
})