const User = require("../models/User");

// FOLLOW USER
const followUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    if (userId === targetId) {
      return res.status(400).json({
        error: "Un usuario no puede seguirse a sí mismo",
      });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const alreadyFollowing = user.following.some(
      (id) => id.toString() === targetId
    );

    if (alreadyFollowing) {
      return res.status(400).json({
        error: "Ya sigues a este usuario",
      });
    }

    user.following.push(targetId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    return res.json({
      message: "Usuario seguido correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al seguir usuario",
    });
  }
};

// UNFOLLOW USER
const unfollowUser = async (req, res) => {
  try {
    const { userId, targetId } = req.params;

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    user.following = user.following.filter(
      (id) => id.toString() !== targetId
    );

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await targetUser.save();

    return res.json({
      message: "Usuario dejado de seguir",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al dejar de seguir usuario",
    });
  }
};

// GET FOLLOWERS
const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("followers", "nickName email");

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    return res.json({
      data: user.followers,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener followers",
    });
  }
};

// GET FOLLOWING
const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("following", "nickName email");

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    return res.json({
      data: user.following,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener following",
    });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};