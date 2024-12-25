const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        const db = await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log(`MongoDB connected ${db.connection.host}`); 
    }catch{
        console.error(`Error: ${error.message}`);
        process.exit(1);      
     }
}

module.exports = connectDB 