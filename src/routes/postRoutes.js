const { Router } = require("express");
const router = Router();
const upload = require("../middlewares/uploadMiddleware");

const {
  assignTags,
  associateTag,
  dissociateTag,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addImage,
  removeImage,
  updateImage,
} = require("../controllers/postController");

const {
  validatePostExists,
  validatePostBody,
} = require("../middlewares/postMiddleware");

const { validateTagId } = require("../middlewares/tagMiddleware");

//rutas para posts
//El post de posts recibe las imagenes enviadas en el campo images y las almacena en uploads/posts
router.post("/", upload.array("images", 10), validatePostBody, createPost);
router.get("/", getPosts);
router.get("/:id", validatePostExists, getPostById);
router.put("/:id", validatePostExists, validatePostBody, updatePost);
router.delete("/:id", validatePostExists, deletePost);

// rutas para tags
router.post("/:id/tags", validatePostExists, assignTags);

router.post(
  "/:id/tags/:tagId",
  validatePostExists,
  validateTagId,
  associateTag,
);

router.delete(
  "/:id/tags/:tagId",
  validatePostExists,
  validateTagId,
  dissociateTag,
);

// rutas para images
router.post(
  "/:id/images",
  upload.single("image"),
  validatePostExists,
  addImage,
);

router.delete("/:id/images/:imageId", validatePostExists, removeImage);

router.put(
  "/:id/images/:imageId",
  upload.single("image"),
  validatePostExists,
  updateImage,
);

module.exports = router;
