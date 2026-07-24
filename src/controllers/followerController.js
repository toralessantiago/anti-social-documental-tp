const User = require("../models/User");

exports.followUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    if (userId === targetId) {
      return res.status(400).json({ message: "No podés seguirte a vos mismo" });
    }

    const [user, target] = await Promise.all([
      User.findById(userId),
      User.findById(targetId),
    ]);

    if (!user || !target) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const yaLoSigue = user.following.some((id) => id.toString() === targetId);
    if (yaLoSigue) {
      return res.status(400).json({ message: "Ya seguís a este usuario" });
    }

    user.following.push(targetId);
    target.followers.push(userId);

    await Promise.all([user.save(), target.save()]);

    res.status(200).json({ message: "Usuario seguido correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al seguir usuario", error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    const [user, target] = await Promise.all([
      User.findById(userId),
      User.findById(targetId),
    ]);

    if (!user || !target) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.following = user.following.filter((id) => id.toString() !== targetId);
    target.followers = target.followers.filter((id) => id.toString() !== userId);

    await Promise.all([user.save(), target.save()]);

    res.status(200).json({ message: "Dejaste de seguir al usuario" });
  } catch (error) {
    res.status(500).json({ message: "Error al dejar de seguir", error: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("followers", "nickname fullname email");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ data: user.followers });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener seguidores", error: error.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("following", "nickname fullname email");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ data: user.following });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios seguidos", error: error.message });
  }
};