const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');

exports.addProductToCart = async ({ userId, productId }) => {
    const product = await Product.findById(productId);
    //check if product exists
    if (!product) {
        throw new CustomError('product not found', 404)
    }

    //check user already has a cart
    let cart = await Cart.findOne({ userId })

    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [{ productId, quantity }],
        });
    } 

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        
        if (itemIndex) {
            const currentQuantity = cart.items[itemIndex].quantity += quantity;
            if(product.stock < currentQuantity){
                
            }
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity })
        }
    

    await cart.save();
    return cart
};