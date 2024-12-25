const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter firstname"],
        unique: true
    },
    lastname: {
        type: String,
        required: [true, "Please enter lastname"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user',         
      },
      createdAt: {
        type: Date,
        default: Date.now, 
      },
    
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };




const user = mongoose.model('User', userSchema);
module.exports = user

