const userSchema = require("../schemas/userSchema");
const updateUserSchema = require("../schemas/updateUserSchema");

const validarUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validarUserUpdate = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { validarUser, validarUserUpdate };
