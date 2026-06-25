const Post = require("../models/Post");

// controladores para tags
const assignTags = async (req, res) => {
  try {
    const post = req.post;

    const { tagsIds } = req.body;

    post.tags = tagsIds;

    await post.save();

    res.status(200).json({
      message: "Tags asignados al post correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al asignar tags en el post",
      error: error.message,
    });
  }
};

const associateTag = async (req, res) => {
  try {
    const post = req.post;

    const { tagId } = req.params;

    post.tags.addToSet(tagId);

    await post.save();

    res.status(200).json({
      message: "Tag asociado al post correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al asociar el tag en el post",
      error: error.message,
    });
  }
};

const dissociateTag = async (req, res) => {
  try {
    const post = req.post;

    const { tagId } = req.params;

    post.tags = post.tags.filter((tag) => tag.toString() !== tagId);

    await post.save();

    res.status(200).json({
      message: "Tag desasociado del post correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al desasociar el tag del post",
      error: error.message,
    });
  }
};

module.exports = {
  assignTags,
  associateTag,
  dissociateTag,
};
