const User = require("../models/User");

// GET USERS
const getUsers = async (req, res) => {
  try {
    // Agregamos fullname y birthDate al select
    const users = await User.find().select("_id fullname nickname email birthDate");

    res.status(200).json({
      message: "Usuarios obtenidos con éxito.",
      data: users,
    });
  } catch (error) {
    console.error("🔥 Error real de Mongoose:", error);
    res.status(500).json({ error: "Error al obtener usuarios." });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "_id fullname nickname email birthDate",
    );

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({
      message: "Usuario obtenido con éxito.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario." });
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

    res.status(200).json({
      message: "Usuario actualizado con éxito.",
      data: {
        id: updatedUser._id,
        fullname: updatedUser.fullname,
        nickname: updatedUser.nickname,
        email: updatedUser.email,
        birthDate: updatedUser.birthDate
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

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario." });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};