const { Router } = require("express");
const router = Router();

const {
  obtenerTags,
  obtenerTag,
  crearTag,
  actualizarTag,
  eliminarTag,
} = require("../controllers/tagController");

const {
  validarTag,
  validarTagId,
  verificarTagDuplicado,
} = require("../middlewares/tagMiddleware");

router.get("/", obtenerTags);

router.get("/:id", validarTagId, obtenerTag);

router.post("/", validarTag, verificarTagDuplicado, crearTag);

router.put(
  "/:id",
  validarTagId,
  validarTag,
  verificarTagDuplicado,
  actualizarTag,
);

router.delete("/:id", validarTagId, eliminarTag);

module.exports = router;
