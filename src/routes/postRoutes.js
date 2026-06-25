const { Router } = require("express");
const router = Router();

const {
  assignTags,
  associateTag,
  dissociateTag,
} = require("../controllers/postController");

const { validatePostExists } = require("../middlewares/postMiddleware");

const { validarTagId } = require("../middlewares/tagMiddleware");

router.post("/:id/tags", validatePostExists, assignTags);

router.post(
  "/:id/tags/:tagId",
  validatePostExists,
  validarTagId, 
  associateTag,
);

router.delete(
  "/:id/tags/:tagId",
  validatePostExists,
  validarTagId, 
  dissociateTag,
);

module.exports = router;