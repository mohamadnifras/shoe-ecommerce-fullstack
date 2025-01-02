const express = require('express')
const orderConrollers= require('../controllers/orderConrollers')
const authMiddleware = require('../middlewares/authMiddleware')

const router  =  express.Router()


router.post('/order/create',authMiddleware,orderConrollers.addOrder);
router.get('/orders', authMiddleware,orderConrollers.getUserOrder)


module.exports = router