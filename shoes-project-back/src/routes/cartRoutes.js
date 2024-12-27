const express = require('express')
const {addToCart} = require('../controllers/cartController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

//add to cart
router.post('/cart/:id',authMiddleware,addToCart)


module.exports = router;