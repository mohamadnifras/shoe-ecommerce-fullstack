const { userRegisterServices, userLoginServices } = require("../services/userService.js")
const asyncHandler = require('../middlewares/asyncHandler')
const { registerValidation, loginValidatin } = require('../utils/validators')
const CustomError = require('../utils/customError')

// registerUser
exports.registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    const { error } = registerValidation.validate({ firstname, lastname, email, password, confirmPassword });
    if (error) throw new CustomError(error.details[0].message, 400);
    const user = await userRegisterServices({ firstname, lastname, email, password })
    console.log(user);
    

    //send response
    res.status(201).json({
        message: 'User registered successfully', user,
    });
});

// loginUser
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidatin.validate({ email, password });
    if (error) throw new CustomError(error.details[0].message, 400);
    const { accessToken, refreshToken, user } = await userLoginServices({ email, password })
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 3 * 24 * 60 * 60 * 1000, //3days
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    })

    res.status(200).json({
        message: 'Login Successfully', user,
    });
});

