const Razrpay = require('razorpay')


const razorpayInstance = new Razrpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_key_secret:process.env.RAZORPAY_KEY_SECRET
});

module.exports = razorpayInstance