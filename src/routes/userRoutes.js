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
} = require("../controllers/userController");

// GET ALL USERS
router.get("/", getUsers);

// GET USER BY ID
router.get("/:id", getUserById);

// CREATE USER
router.post("/", validateUser, createUser);

// UPDATE USER
router.put("/:id", validateUserUpdate, updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

module.exports = router;