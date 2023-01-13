import { Router } from "express";
import { isTokenValid, verifyToken } from "../../Middelwares/Token.js";
import {
  borrarUnSlider,
  crearUnSlider,
  modificarUnSlider,
  obtenerTodosLosSliders,
} from "../controllers/sliders.controllers.js";
const router = Router();

router.post("/getSliders", obtenerTodosLosSliders);
router.post("/", verifyToken, isTokenValid, crearUnSlider);
router.put("/:id", verifyToken, isTokenValid, modificarUnSlider);
router.delete("/:id", verifyToken, isTokenValid, borrarUnSlider);

export default router;
