const express = require("express");
const dotenv = require("dotenv");
const conectarDB = require("./config/db");

const routerTag = require("./routes/tagRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/tags", routerTag);

conectarDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
