const Tag = require("../models/Tag");

const obtenerTags = async (req, res) => {
  try {
    const tags = await Tag.find().select("-createdAt -updatedAt -__v");

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tags",
      error: error.message,
    });
  }
};

const obtenerTag = async (req, res) => {
  const tag = req.tag;

  res.status(200).json({
    _id: tag._id,
    name: tag.name,
  });
};

const crearTag = async (req, res) => {
  try {
    const tagNuevo = await Tag.create(req.body);

    res.status(201).json({
      message: "Etiqueta creada correctamente.",
      tag: tagNuevo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el tag",
      error: error.message,
    });
  }
};

const actualizarTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tagActualizado = await Tag.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Tag actualizado correctamente.",
      tag: tagActualizado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el tag",
      error: error.message,
    });
  }
};

const eliminarTag = async (req, res) => {
  try {
    const { id } = req.params;

    await Tag.findByIdAndDelete(id);

    res.status(200).json({
      message: "Tag eliminado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el tag",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerTags,
  obtenerTag,
  crearTag,
  actualizarTag,
  eliminarTag,
};
