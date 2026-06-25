const express = require("express");
const dotenv = require("dotenv");
const conectarDB = require("./config/db");
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

const app = express();

app.use(express.json());

conectarDB();

app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});