const User = require('../models/userModel');
const CustomError = require('../utils/customError');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')

//Register services

exports.userRegisterServices = async ({ firstname, lastname, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError('Email already registered', 400);
    }

    try {
        const user = await User.create({ firstname, lastname, email, password })
        return { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, password: user.password }
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            throw new CustomError(`The ${field} "${error.keyValue[field]}" is already taken. Please use a different one.`, 400);
        }
        throw new CustomError('Error registering user', 500)
    }

};

exports.userLoginServices = async ({ email, password }) => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError('Invalid email or password', 'Please create an account', 400)
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new CustomError('Invalid email or password', 400)
    }


    const accessToken = generateAccessToken({ id: user._id, role: user.role, email: user.email })
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role, email: user.email })

    return {
        accessToken,
        refreshToken,
        user: { id: user._id, role: user.role, email: user.email }
    }
}
