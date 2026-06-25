require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const YAML = require("js-yaml");
const swaggerUi = require("swagger-ui-express");

const conectarDB = require("./config/db");

const routerTag = require("./routes/tagRoutes");
const routerPost = require("./routes/postRoutes");
const routerUsers = require("./routes/userRoutes");
const routerFollowers = require("./routes/followerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, "swagger.yml"), "utf8")
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/tags", routerTag);
app.use("/posts", routerPost);
app.use("/users", routerUsers);
app.use("/followers", routerFollowers);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
      console.log(`Swagger en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error iniciando servidor:", error);
  }
};

startServer();
