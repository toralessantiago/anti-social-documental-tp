const Joi = require("joi");

const userSchema = Joi.object({
  fullname: Joi.string().min(5).max(30).required(),
  nickname: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  birthDate: Joi.date().iso().required(),

  bio: Joi.string().max(200).optional().allow(""),
  location: Joi.string().max(100).optional().allow(""),
});

const updateUserSchema = Joi.object({
  fullname: Joi.string().min(5).max(30).optional(),
  nickname: Joi.string().min(5).max(20).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(20).optional(),
  birthDate: Joi.date().iso().optional(),

  bio: Joi.string().max(200).optional().allow(""),
  location: Joi.string().max(100).optional().allow(""),
}).min(1);

module.exports = { userSchema, updateUserSchema };
