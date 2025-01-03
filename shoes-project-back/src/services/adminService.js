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





module.exports = { allUsersService, getUser, }