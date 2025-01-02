const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');

//add cart services
const addProductToCart = async ({ userId, productId }) => {
    const existingItem = await Product.findById(productId);
    //check if product exists
    if (!existingItem) {
        throw new CustomError('product not found', 404)
    }

    //check user already has a cart
    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [],
        });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
        const currentQuantity = cart.items[itemIndex].quantity;
        if (currentQuantity + 1 > existingItem.quantity) {
            throw new CustomError("You cannot add the product to the cart. Insufficient stock.", 400)
        }
        cart.items[itemIndex].quantity += 1
        await cart.save();
        throw new CustomError("Product already exists in the cart, ", 400)
    } else {
        cart.items.push({ productId, quantity: 1 })
        await cart.save();
    }

    return cart
};


//getCartService all product 
const getCartService = async ({ userId, page, limit }) => {
console.log(userId);

    const skip = (page - 1) * limit
    const cart = await Cart.findOne({ user: userId })
        // .populate('items.productId')
        .skip(skip)
        .limit(limit);
    if (!cart) {
        throw new ('Cart not found', 404);
    }
    return cart
}

//deletedService
const deletedService = async ({userId, productId})=>{

    const cart = await Cart.findOne({user:userId}) 
    
    if(!cart){
        throw new CustomError("Cart not found", 404)
    }

    const existingItem = cart.items.find((item)=> item.productId.toString() === productId)
    if(!existingItem){
        throw new CustomError("Product not found in cart", 404)
    }

    cart.items.pull({productId})
    await cart.save()
    return cart

}


module.exports = { addProductToCart, getCartService, deletedService}