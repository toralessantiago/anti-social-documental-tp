const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

const validatePostExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "El ID del post debe ser un formato válido de MongoDB",
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    req.post = post;

    next();
  } catch (error) {
    res.status(500).json({
      error: "Error al validar la existencia del post",
    });
  }
};

// validar body al crear post
const validatePostBody = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido",
      });
    }

    const { description, user } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        message: "La descripción es obligatoria",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "El usuario es obligatorio",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        message: "UserId inválido",
      });
    }

    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({
        message: "El usuario especificado no existe en el sistema",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al validar el body del post" });
  }
};

module.exports = {
  validatePostExists,
  validatePostBody,
};
