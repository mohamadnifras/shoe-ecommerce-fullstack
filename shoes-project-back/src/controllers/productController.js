const asyncHandler = require('../middlewares/asyncHandler')
const { getProductsService, addProduct } = require('../services/productService')

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

exports.addproduct = asyncHandler(async(req,res)=>{
    const productData = req.body
    if(req.file && req.file.path){
        productData.image = req.file.path;
    }else{
        return res.status(400).json({
            success:false,
            message:'Image upload failed. Please Include a Image file.',
        })
    }
    const product = await addProduct(productData);

    res.status(201).json({
        success:true,
        message:'Products add successfully',
        product,
    })
})

