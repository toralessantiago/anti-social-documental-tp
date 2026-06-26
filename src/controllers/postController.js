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


//Contorladores para post
const createPost = async (req, res) => {
  try {
    const { description, user, images, tags } = req.body;

    const post = await Post.create({
      description,
      user,
      images,
      tags,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate("tags");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user")
      .populate("tags");

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("user")
      .populate("tags");

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  assignTags,
  associateTag,
  dissociateTag,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
