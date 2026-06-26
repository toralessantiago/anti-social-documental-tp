const { Router } = require("express");
const router = Router();

const {
  assignTags,
  associateTag,
  dissociateTag,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { validatePostExists, validatePostBody } = require("../middlewares/postMiddleware");

const { validarTagIdEnPost } = require("../middlewares/tagMiddleware");


//rutas para posts
router.post("/",validatePostBody, createPost);
router.get("/", getPosts);
router.get("/:id",validatePostExists, getPostById);
router.put("/:id",validatePostExists, validatePostBody, updatePost);
router.delete("/:id",validatePostExists, deletePost);


// rutas para tags
router.post("/:id/tags", validatePostExists, assignTags);

router.post(
  "/:id/tags/:tagId",
  validatePostExists,
  validarTagIdEnPost,
  associateTag,
);

router.delete(
  "/:id/tags/:tagId",
  validatePostExists,
  validarTagIdEnPost,
  dissociateTag,
);

module.exports = router;
