import { Router, Request, Response } from "express";
import {
  obtenerCategorias,
  crearCategoria,
  editarCategoria,
  borrarCategoria,
} from "../services/categorias.services.js";

import { isTokenValid, verifyToken } from "../../Middelwares/Token.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
const { handleHttpError } = ErrorHandler;
const router = Router();

router.post("/getCategorias", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const categorias = await obtenerCategorias(token);
    res.json(categorias);
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
      const nuevaCategoria = await crearCategoria(req.body, user);
      res.json(nuevaCategoria);
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
      const categoriaEditada = await editarCategoria(req.body, id, user);
      res.json(categoriaEditada);
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
    try {
      const { id } = req.params;
      const user = (req as any).user;
      const borrado = await borrarCategoria(id, user);
      res.json({ delete: borrado > 0 });
    } catch (error) {
      handleHttpError(error as Error, res);
    }
  }
);

export default router;
