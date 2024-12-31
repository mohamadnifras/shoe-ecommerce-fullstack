const express = require('express')
const {addToCart, getCart, deletedCart} = require('../controllers/cartController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

//add to cart
router.post('/cart/:productId',authMiddleware,addToCart)
router.get('/cart',authMiddleware,getCart)
router.delete('/cart/:productId',authMiddleware,deletedCart)


module.exports = router;