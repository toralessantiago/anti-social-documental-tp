const { Router } = require("express");
const { getComments, getCommentsByPost, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const { validateComment, validateCommentId, validateUpdateComment } = require('../middlewares/validateComment');
const router = Router();

router.get("/", getComments);
router.get("/post/:postId", getCommentsByPost);
router.post("/", validateComment, createComment);
router.put("/:id", validateCommentId, validateUpdateComment, updateComment);
router.delete("/:id", validateCommentId, deleteComment);

module.exports = router;