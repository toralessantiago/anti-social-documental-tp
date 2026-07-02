const Post = require("../models/Post");
const { redisClient } = require("../config/redis");

const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ user: userId })
      .populate("user", "nickname email")
      .populate("tags", "name")
      .select("-__v");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener publicaciones del usuario.",
    });
  }
};


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

    post.tags.pull(tagId);
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
    const { description, user, tags, images: imageUrls } = req.body;

    const uploadedImages = req.files
      ? req.files.map((file) => ({
          url: `/uploads/posts/${file.filename}`,
        }))
      : [];

    let bodyImages = [];

    if (imageUrls) {
      const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

      bodyImages = urls.map((url) => ({ url }));
    }

    const post = await Post.create({
      description,
      user,
      images: [...uploadedImages, ...bodyImages],
      tags,
    });

    await redisClient.del("posts_feed");

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPosts = async (req, res) => {
  try {
    const cachedPosts = await redisClient.get("posts_feed");

    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    const posts = await Post.find()
      .populate("user", "nickname email") // Protege contraseña
      .populate("tags", "name");

    await redisClient.setEx("posts_feed", 60, JSON.stringify(posts));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = req.post;

    await post.populate("user", "nickname email");
    await post.populate("tags", "name");

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
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

const addImage = async (req, res) => {
  try {
    const post = req.post;
    const { url } = req.body;

    // 1. si viene archivo multer
    if (req.file) {
      post.images.push({
        url: `/uploads/posts/${req.file.filename}`,
      });
    }

    // 2. si viene URL por body
    if (url) {
      post.images.push({ url });
    }

    await post.save();

    res.status(200).json({
      message: "Imagen agregada correctamente",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar imagen",
      error: error.message,
    });
  }
};

const removeImage = async (req, res) => {
  try {
    const post = req.post;
    const { imageId } = req.params;

    const image = post.images.id(imageId);

    if (!image) {
      return res.status(404).json({
        message: "Imagen no encontrada",
      });
    }

    image.deleteOne();

    await post.save();

    res.status(200).json({
      message: "Imagen eliminada correctamente",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar imagen",
      error: error.message,
    });
  }
};

const updateImage = async (req, res) => {
  try {
    const post = req.post;
    const { imageId } = req.params;
    const { url } = req.body;

    const image = post.images.id(imageId);

    if (!image) {
      return res.status(404).json({
        message: "Imagen no encontrada",
      });
    }

    // reemplazo híbrido
    if (req.file) {
      image.url = `/uploads/posts/${req.file.filename}`;
    } else if (url) {
      image.url = url;
    } else {
      return res.status(400).json({
        message: "Debes enviar una imagen o URL",
      });
    }

    await post.save();

    res.status(200).json({
      message: "Imagen actualizada correctamente",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar imagen",
      error: error.message,
    });
  }
};

const toggleLike = async (req, res) => {
  try {
    const post = req.post;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Falta el userId" });
    }

    const index = post.likes.findIndex((id) => id.toString() === userId);

    if (index === -1) {
      post.likes.push(userId); 
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();

    res.status(200).json({
      message: index === -1 ? "Like agregado" : "Like eliminado",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar el like", error: error.message });
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
  addImage,
  removeImage,
  updateImage,
  toggleLike,
  getPostsByUser
};
