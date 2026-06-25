const mongoose = require("mongoose");
const Tag = require("../models/Tag");

const validarTag = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "El nombre del tag es obligatorio",
    });
  }

  next();
};

const validarTagId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "El ID del tag debe ser un formato válido de MongoDB",
      });
    }

    const tag = await Tag.findById(id);

    if (!tag) {
      return res.status(404).json({
        message: "Tag no encontrado",
      });
    }

    req.tag = tag;

    next();
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el tag",
    });
  }
};

const verificarTagDuplicado = async (req, res, next) => {
  try {
    const { name } = req.body;

    const tagExistente = await Tag.findOne({ name });

    if (tagExistente) {
      return res.status(400).json({
        message: "El tag ya existe",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: "Error al verificar el tag",
    });
  }
};

const validarTagIdEnPost = async (req, res, next) => {
  try {
    const { tagId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "El ID del tag debe ser un formato válido de MongoDB",
      });
    }

    const tag = await Tag.findById(tagId);

    if (!tag) {
      return res.status(404).json({
        message: "Tag no encontrado",
      });
    }

    req.tag = tag;

    next();
  } catch (error) {
    res.status(500).json({
      error: "Error al validar el tag",
    });
  }
};

module.exports = {
  validarTag,
  validarTagId,
  verificarTagDuplicado,
  validarTagIdEnPost,
};
