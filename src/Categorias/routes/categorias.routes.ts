import { Router, Request, Response } from 'express';
import {
  obtenerCategorias,
  crearCategoria,
  editarCategoria,
  borrarCategoria,
} from '../services/categorias.services.js';

import {isTokenValid,verifyToken} from "../../Middelwares/Token.js";
import ErrorHandler from '../../utils/ErrorHandler.js';
const { handleHttpError } = ErrorHandler;
const router = Router();

router.get('/',verifyToken,isTokenValid, async (req: Request, res: Response) => {
  try {
    const categorias = await obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.post('/',verifyToken,isTokenValid, async (req: Request, res: Response) => {
  console.log('AVER', req.body);
  try {
    const nuevaCategoria = await crearCategoria(req.body);
    res.json(nuevaCategoria);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.put('/:id',verifyToken,isTokenValid, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoriaEditada = await editarCategoria(req.body, id);
    res.json(categoriaEditada);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.delete('/:id',verifyToken,isTokenValid, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const borrado = await borrarCategoria(id);
    res.json({ delete: borrado > 0 });
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

export default router;
