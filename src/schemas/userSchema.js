const Joi = require("joi");

const userSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
}).min(1);

module.exports = { userSchema, updateUserSchema };
