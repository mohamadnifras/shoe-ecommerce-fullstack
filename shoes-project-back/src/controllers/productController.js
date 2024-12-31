const asyncHandler = require('../middlewares/asyncHandler')
const { getProductsService } = require('../services/productService')

exports.getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 15, name, category } = req.query;

    const { products, total } = await getProductsService({ page: parseInt(page), limit: parseInt(limit), name, category, id })


    return res.status(200).json({
        success: true,
        count: products.length,
        total,
        page: Math.ceil(total / limit),
        currentPage: parseInt(page),
        products,
    })

});