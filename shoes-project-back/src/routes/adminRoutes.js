const express = require('express')
const isAdmin = require('../middlewares/isAdmin')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsers, getUserById, blockAndUnblockUser,getAllOrders } = require('../controllers/adminController')

const router = express.Router()

router.get('/users', authMiddleware, isAdmin, getAllUsers)
router.get('/users/:id', authMiddleware, isAdmin, getUserById)
router.put('/users/:id/block', authMiddleware, isAdmin,blockAndUnblockUser)
router.get('/orders',authMiddleware,isAdmin,getAllOrders)



module.exports = router



