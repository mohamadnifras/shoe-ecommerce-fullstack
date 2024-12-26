const Product = require('../models/productModel');
const CustomError = require('../utils/customError')
const mongoose = require('mongoose');


exports.getProductsService = async ({ page, limit, name, category, id }) => {
    const skip = (page - 1) * limit

    let match = {isDeleted: false};

    //search name
    if(name){
        match.name = {$regex:name, $options: 'i'};
    }

    if(category){
        match.category = {$regex:category, $options: 'i'}
    }

    if(id){
        match._id = new mongoose.Types.ObjectId(id)
    }

    const pipeline = [
        {$match: match},
        {$skip:skip},
        {$limit:limit},
    ];

    const products = await Product.aggregate(pipeline)
    
      
       if (id && products.length === 0) {
        throw new CustomError('Product not found or is deleted', 404);
    }

    const total = await Product.countDocuments({ isDeleted: false, ...match });
    return { products, total };
   
    
};
