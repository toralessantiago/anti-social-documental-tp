const { Router } = require("express");
const router = Router();

const {
  assignTags,
  associateTag,
  dissociateTag,
} = require("../controllers/postController");

const { validatePostExists } = require("../middlewares/postMiddleware");

const { validarTagIdEnPost } = require("../middlewares/tagMiddleware");

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
