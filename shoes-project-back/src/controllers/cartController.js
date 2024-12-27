const asyncHandler = require('../middlewares/asyncHandler')
const cartSevice = require('../services/CartService')


exports.addToCart = asyncHandler(async (req, res) => {
    const {userId} = req.userId
    const {productId} = req.params;

    const cart = await cartSevice.addProductToCart({ userId, productId });

    res.status(200).json({
        success: true,
        message: 'Product added to cat successfully🛒',
        cart,
    });
});