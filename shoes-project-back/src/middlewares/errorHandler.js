const errorHandler = (err, req, res, next)=>{
    let statusCode = err.statusCode || 500;
     console.log(err)
    let message = err.message|| 'Internal Server Error';

    res.status(statusCode).json({
        status:'error',
        message,
    })
};




module.exports = errorHandler;