const express = require("express");
const router = express.Router();

const {
  validateUser,
  validateUserUpdate,
} = require("../middlewares/validateUser");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts,    
  getUserComments, 
  getUserLikes    
} = require("../controllers/userController");

// --- RUTAS NUEVAS ---
router.get("/:id/posts", getUserPosts);
router.get("/:id/comments", getUserComments);
router.get("/:id/likes", getUserLikes);

// --- RUTAS EXISTENTES ---
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateUser, createUser);
router.put("/:id", validateUserUpdate, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;