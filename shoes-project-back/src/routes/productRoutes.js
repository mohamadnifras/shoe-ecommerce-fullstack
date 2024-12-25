const express = require('express');
const productDetail = require('../controllers/productController')

const router = express.Router()


// get services for user
router.get('/product', productDetail.getProduct)


module.exports = router