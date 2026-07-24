const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const YAML = require("js-yaml");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const routerTags = require("./routes/tagRoutes");
const routerPosts = require("./routes/postRoutes");
const routerUsers = require("./routes/userRoutes");
const routerFollowers = require("./routes/followerRoutes");
const routerComments = require("./routes/commentRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8"),
);
app.use(
  cors({
      origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/tags", routerTags);
app.use("/api/posts", routerPosts);
app.use("/api/users", routerUsers);
app.use("/api/followers", routerFollowers);
app.use("/api/comments", routerComments);

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
      console.log(`Swagger en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error iniciando servidor:", error);
  }
};

startServer();
