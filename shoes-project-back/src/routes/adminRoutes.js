const express = require('express')
const isAdmin = require('../middlewares/isAdmin')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsers, getUserById, getProducts} = require('../controllers/adminController')

const router = express.Router()

router.get('/users', authMiddleware, isAdmin, getAllUsers)
router.get('/users/:id', authMiddleware, isAdmin, getUserById)




module.exports = router



