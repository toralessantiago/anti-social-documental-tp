const express = require("express");
const router = express.Router();

const {
  validarUser,
  validarUserUpdate,
} = require("../middlewares/validarUser");

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
router.post("/", validarUser, createUser);

// UPDATE USER
router.put("/:id", validarUserUpdate, updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

module.exports = router;