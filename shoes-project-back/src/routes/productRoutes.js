const express = require('express');
const productDetail = require('../controllers/productController')

const router = express.Router()


// get services for user
router.get('/product', productDetail.getProduct)
router.get('/product/:id', productDetail.getProduct)


module.exports = router