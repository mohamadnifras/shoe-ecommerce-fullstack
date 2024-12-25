const asyncHandler = require('../middlewares/asyncHandler')
const CustomError = require('../utils/customError')


exports.getProduct = asyncHandler(async(req,res)=>{
    const {category, page, limit} = req.query;
    

})