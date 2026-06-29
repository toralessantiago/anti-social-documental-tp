const Joi = require("joi");

const userSchema = Joi.object({
  fullName: Joi.string().min(5).max(30).required(),
  nickname: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  birthDate: Joi.date().iso().required()
});

const updateUserSchema = Joi.object({
  fullName: Joi.string().min(5).max(30).optional(),
  nickname: Joi.string().min(5).max(20).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(20).optional(),
  birthDate: Joi.date().iso().optional()
}).min(1);

module.exports = { userSchema, updateUserSchema };