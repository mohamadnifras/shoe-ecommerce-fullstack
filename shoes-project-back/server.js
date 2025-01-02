const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./src/routes/userRoutes')
const connectDB = require('./src/config/db')
const cookieParser = require('cookie-parser')
const productRoutes = require('./src/routes/productRoutes')
const cartRoutes = require('./src/routes/cartRoutes')
const errorHandler = require('./src/middlewares/errorHandler')
const orderRoutes = require('./src/routes/orderRoutes')
const adminRoutes =require('./src/routes/adminRoutes')
dotenv.config()
const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())


//Connect to DB
connectDB()

//user Routes
app.use('/api/user', userRoutes)
app.use('/api/user', productRoutes)
app.use('/api/user', cartRoutes)
app.use('/api/user', orderRoutes)

//Admin Routes
app.use('/api/admin', adminRoutes)


//errorHandler
app.use(errorHandler);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

