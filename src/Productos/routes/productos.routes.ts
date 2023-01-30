import { Router, Request, Response } from "express";
import {
  obtenerProductos,
  crear,
  modificar,
  borrar,
} from "../services/productos.services.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { isTokenValid, verifyToken } from "../../Middelwares/Token.js";
import Logger from "../../utils/Logger.js";
import { createProductAndVariants } from "../transactions/product.transactions.js";
const { handleHttpError } = ErrorHandler;
const router = Router();

router.post("/getProductos", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const productos = await obtenerProductos(token);
    res.json(productos);
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
      const nuevoProducto = await crear(req.body, user);
      res.json(nuevoProducto);
    } catch (error) {
      handleHttpError(error as Error, res);
    }
  }
);

router.post(
  "/conVariantes",
  verifyToken,
  isTokenValid,
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const product = await createProductAndVariants(user, req.body);
      res.json(product);
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
      Logger.marked(user.token);
      const modifacado = await modificar(req.body, id, user);
      res.json(modifacado);
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
      const borrado = await borrar(id, user);
      res.json({ deleted: borrado > 0 });
    } catch (error) {
      handleHttpError(error as Error, res);
    }
  }
);

export default router;
