const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del tag es obligatorio"],
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [30, "El nombre no puede superar los 30 caracteres"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tag", tagSchema);
