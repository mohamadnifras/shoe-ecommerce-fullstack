const express = require('express')
const {addOrder} = require('../controllers/orderConrollers')
const authMiddleware = require('../middlewares/authMiddleware')

const router  =  express.Router()

router.post('/order',authMiddleware,addOrder)


module.exports = router