const asyncHandler = require('../middlewares/asyncHandler');
const adminService = require('../services/adminService')


//get allUsers
exports.getAllUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const allUsers = await adminService.allUsersService({ page, limit });

    res.status(201).json(allUsers)
})

//get user
exports.getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await adminService.getUser(id);

    res.status(201).json(user)
})

