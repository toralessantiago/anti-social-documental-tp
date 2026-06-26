const mongoose = require("mongoose");
const Post = require("../models/Post");

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
const validatePostBody = (req, res, next) => {
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

  next();
};

module.exports = {
  validatePostExists,
  validatePostBody
};
