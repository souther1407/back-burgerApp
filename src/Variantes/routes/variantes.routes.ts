import { Router, Request, Response } from "express";
import {
  obtenerVariantes,
  crearVariante,
  eliminarVariante,
  modificarVariante,
} from "../services/variantes.services.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
const { handleHttpError } = ErrorHandler;
const router = Router();
import { isTokenValid, verifyToken } from "../../Middelwares/Token.js";
import Logger from "../../utils/Logger.js";

router.post("/getVariantes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { token } = req.body;
  try {
    Logger.marked(id);
    const variantes = await obtenerVariantes(id, token);
    res.json(variantes);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.post(
  "/",
  verifyToken,
  isTokenValid,
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const nuevaVariante = await crearVariante(req.body, user);
      res.json(nuevaVariante);
    } catch (error) {
      handleHttpError(error as Error, res);
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  isTokenValid,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = (req as any).user;
      const varianteEliminada = await eliminarVariante(id, user);
      res.json({ deleted: varianteEliminada > 0 });
    } catch (error) {
      handleHttpError(error as Error, res);
    }
  }
);

router.put(
  "/:id",
  verifyToken,
  isTokenValid,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = (req as any).user;
      const varianteModificada = await modificarVariante(id, user, req.body);
      res.json(varianteModificada);
    } catch (error) {
      handleHttpError(error as Error, res);
    }
  }
);

export default router;
