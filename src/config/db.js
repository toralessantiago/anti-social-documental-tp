const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión a MongoDB establecida con éxito.");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

module.exports = connectDB;
