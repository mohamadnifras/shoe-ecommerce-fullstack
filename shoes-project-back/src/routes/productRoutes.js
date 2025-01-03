const express = require('express');
const productDetail = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdmin')
const upload = require('../middlewares/uploadMiddleware')

const router = express.Router()


// get product userSide
router.get('/product', productDetail.getProduct)
router.get('/product/:id', productDetail.getProduct)

// Admin side 
router.post('/addproduct',authMiddleware,isAdmin,upload.single('image'),productDetail.addproduct)


module.exports = router