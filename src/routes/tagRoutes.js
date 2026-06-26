const { Router } = require("express");
const router = Router();

const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

const {
  validateTag,
  validateTagId,
  verifyDuplicateTag,
} = require("../middlewares/tagMiddleware");

router.get("/", getTags);

router.get("/:id", validateTagId, getTagById);

router.post("/", validateTag, verifyDuplicateTag, createTag);

router.put("/:id", validateTagId, validateTag, verifyDuplicateTag, updateTag);

router.delete("/:id", validateTagId, deleteTag);

module.exports = router;
