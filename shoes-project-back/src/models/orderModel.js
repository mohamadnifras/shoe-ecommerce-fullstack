const { required } = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
       userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
       },
       items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                required:true,
            }, 
        }
       ],
       shippingAddress:{
        name:{type:String,required:true},
        address:{type:String,required:true},
        email:{ type: String, required: true,unique: true, lowercase:true},
        phone:{type:Number,required:true}
       },
       
})