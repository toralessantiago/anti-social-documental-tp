const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    const meses = parseInt(process.env.LIMIT_MONTHS) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - meses);

    const comentarios = await Comment.find({ createdAt: { $gte: fechaLimite }, visible: true })
      .populate("user", "nickname email")
      .populate("post", "description")
      .select("-__v -updatedAt");

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios." });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const meses = parseInt(process.env.LIMIT_MONTHS) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - meses);

    const comentarios = await Comment.find({ 
      post: req.params.postId,
      createdAt: { $gte: fechaLimite },
      visible: true 
    })
      .populate("user", "nickname email")
      .select("-__v -updatedAt");

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios del post." });
  }
};

const createComment = async (req, res) => {
  try {
    const { content, user, post, createdAt } = req.body;

    const comentario = await Comment.create({
      content,
      user,
      post,
      ...(createdAt && { createdAt }),
    });

    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario." });
  }
};

const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comentario = await Comment.findByIdAndUpdate(
      req.comentario._id,
      { content },
      { new: true, runValidators: true }
    );
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el comentario." });
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.comentario._id);
    res.status(200).json({ message: "Comentario eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario." });
  }
};

module.exports = {
  getComments,
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
};