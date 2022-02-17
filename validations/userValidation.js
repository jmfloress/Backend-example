const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

const userValidation = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    userName: Joi.string().required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.number()
});

module.exports = validator.body(userValidation);