const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: { 
        type: String, 
        required: [true, "La URL de la imagen es obligatoria"],
        trim: true,
    },
});

const postSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,
      required: [true, "La descripcion del post es obligatoria"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [imageSchema],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);