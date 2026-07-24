const User = require("../models/User");
const Post = require("../models/Post");      
const Comment = require("../models/Comment");
// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id fullname nickname email birthDate");

    res.status(200).json({
      message: "Usuarios obtenidos con éxito.",
      data: users,
    });
  } catch (error) {
    console.error("Error real de Mongoose:", error);
    res.status(500).json({ error: "Error al obtener usuarios." });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "nickname fullname email")
      .populate("following", "nickname fullname email");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { fullname, nickname, email, password, birthDate } = req.body;

    // Creamos el usuario en MongoDB
    const newUser = await User.create({
      fullname,
      nickname,
      email,
      password,
      birthDate
    });

    return res.status(201).json({
      message: "Usuario creado con éxito.",
      data: newUser,
    });
  } catch (error) {
    // Detectamos el error de clave duplicada de MongoDB (11000)
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `El ${campoDuplicado} ya se encuentra registrado por otro usuario.`,
      });
    }

    return res.status(500).json({
      message: "Error al crear usuario.",
      error: error.message,
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (req.body.nickname) {
      const existingUser = await User.findOne({ nickname: req.body.nickname });

      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ error: "El nickname ya existe." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Acá está el cambio principal: el objeto "data" devuelve toda la info completa
    res.status(200).json({
      message: "Usuario actualizado con éxito.",
      data: {
        id: updatedUser._id,
        fullname: updatedUser.fullname,
        nickname: updatedUser.nickname,
        email: updatedUser.email,
        birthDate: updatedUser.birthDate,
        bio: updatedUser.bio,
        location: updatedUser.location,
        followers: updatedUser.followers,
        following: updatedUser.following,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario." });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    await User.updateMany(
      {}, 
      { 
        $pull: { 
          followers: req.params.id, 
          following: req.params.id 
        } 
      }
    );
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario." });
  }
};

// GET /users/:id/posts - Publicaciones del usuario
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "nickname email")
      .populate("tags", "name")
      .sort({ createdAt: -1 }); // Ordena de más nuevo a más viejo

    res.status(200).json({
      message: "Publicaciones del usuario obtenidas con éxito.",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las publicaciones del usuario." });
  }
};
// GET /users/:id/comments - Comentarios de usuario
const getUserComments = async (req, res) => {
  try {
    const comments = await Comment.find({ user: req.params.id })
      .populate("post", "description")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comentarios del usuario obtenidos con éxito.",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios del usuario." });
  }
};

const getUserLikes = async (req, res) => {
  try {
    const likedPosts = await Post.find({ likes: req.params.id })
      .populate("user", "nickname email")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Posts que le gustan al usuario obtenidos con éxito.",
      data: likedPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los likes del usuario." });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Usuario o contraseña incorrecta." });
    }

    const userData = {
      id: user._id,
      fullname: user.fullname,
      nickname: user.nickname,
      email: user.email,
      bio: user.bio,
      location: user.location,
      followers: user.followers,
      following: user.following,
      createdAt: user.createdAt
    };

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno al iniciar sesión." });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts,
  getUserComments, 
  getUserLikes, 
  loginUser   
};