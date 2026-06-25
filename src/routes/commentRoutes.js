const { Router } = require("express");
const { obtenerComentarios, obtenerComentariosPorPost, crearComentario, actualizarComentario, eliminarComentario } = require('../controllers/commentController');
const { validarComment, validarCommentId, validarUpdateComment } = require('../middlewares/validarComment');
const router = Router();

router.get("/", obtenerComentarios);
router.get("/post/:postId", obtenerComentariosPorPost);
router.post("/", validarComment, crearComentario);
router.put("/:id", validarCommentId, validarUpdateComment, actualizarComentario);
router.delete("/:id", validarCommentId, eliminarComentario);

module.exports = router;