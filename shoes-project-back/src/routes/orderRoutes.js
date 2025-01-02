const express = require('express')
const orderConrollers= require('../controllers/orderConrollers')
const authMiddleware = require('../middlewares/authMiddleware')

const router  =  express.Router()


router.post('/order',authMiddleware,orderConrollers.addOrder)


module.exports = router