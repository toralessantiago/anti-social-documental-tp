const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "El nombre completo es obligatorio"],
      trim: true,
    },
    nickname: {
      type: String,
      required: [true, "El nickname es obligatorio"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true, 
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    birthDate: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);