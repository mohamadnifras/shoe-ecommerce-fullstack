const User = require('../models/userModel')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const CustomError = require('../utils/customError')

//all users service
const allUsersService = async ({ page, limit }) => {
    const skip = (page - 1) * limit
    const allUsers = await User.find({ role: 'user' })
        .skip(skip)
        .limit(limit)
        .select('-password')
        .sort({ createdAt: -1 })
    const totalUser = await User.countDocuments({ role: 'user' })

    return {
        allUsers, totalUser
    }
};


//get user id 

const getUser = async (id) => {

    const user = await User.findById(id)
    if (!user) {
        throw new CustomError('User not fount')
    }
    return user
}

//get all products and category
const getAdminProductsService = async ({ page, limit, category }) => {
    const skip = (page - 1) * limit

    let match = { isDeleted: false };


    if (category) {
        match.category = { $regex: category, $options: 'i' }
    }

    if (id) {
        match._id = new mongoose.Types.ObjectId(id)
    }

    const pipeline = [
        { $match: match },
        { $skip: skip },
        { $limit: limit },
    ];

    const products = await Product.aggregate(pipeline)
    console.log(products);
    


    if (id && products.length === 0) {
        throw new CustomError('Product not found or is deleted', 404);
    }

    const total = await Product.countDocuments({ isDeleted: false, ...match });
    return { products, total };

}



module.exports = { allUsersService, getUser, getAdminProductsService }