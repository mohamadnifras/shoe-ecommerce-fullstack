const Joi = require('joi');

// user registration Validation
const registerValidation = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': '"Firstname" must be at least 3 characters long',
      'string.max': '"Firstname" cannot be more than 30 characters',
      "any.required": `"Firstname" is a required field`,
    }),
  lastname: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': '"Lastname" must be at least 3 characters long',
      'string.max': '"Lastname" cannot be more than 30 characters',
       "any.required": `"Lastname" is a required field`,
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '"Email" must be a valid email address',
      'any.required': '"Email" is a required field',
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': '"Password" must be at least 8 characters long',
      'any.required': '"Password" is a required field',
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': '"Confirm Password" must match the "Password"',
      'any.required': '"Confirm Password" is a required field',
    }),
});


//login for Validation

const loginValidatin = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address.',
      'string.empty': 'Email is required.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
    }),
})
module.exports = { registerValidation, loginValidatin };