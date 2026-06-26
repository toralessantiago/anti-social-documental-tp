const User = require("../models/User");

// SEGUIR A UN USUARIO (POST)
const followUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    if (userId === targetId) {
      return res.status(400).json({ error: "No podés seguirte a vos mismo." });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { following: targetId },
    });
    await User.findByIdAndUpdate(targetId, {
      $addToSet: { followers: userId },
    });

    res.status(200).json({ message: "Usuario seguido con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Error al seguir al usuario." });
  }
};

// DEJAR DE SEGUIR (DELETE)
const unfollowUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    await Promise.all([
      User.findByIdAndUpdate(userId, { $addToSet: { following: targetId } }),
      User.findByIdAndUpdate(targetId, { $addToSet: { followers: userId } }),
    ]);

    res.status(200).json({ message: "Has dejado de seguir al usuario." });
  } catch (error) {
    res.status(500).json({ error: "Error al dejar de seguir al usuario." });
  }
};

// OBTENER SEGUIDOS (GET)
const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "following",
      "_id nickname email",
    );

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({
      message: "Lista de seguidos obtenida con éxito.",
      data: user.following,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de seguidos." });
  }
};

// OBTENER SEGUIDORES (GET)
const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "followers",
      "_id nickname email",
    );

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({
      message: "Lista de seguidores obtenida con éxito.",
      data: user.followers,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los seguidores." });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
