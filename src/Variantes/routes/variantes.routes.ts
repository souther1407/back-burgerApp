import { Router, Request, Response } from 'express';
import {
  obtenerVariantes,
  crearVariante,
  eliminarVariante,
  modificarVariante,
} from '../services/variantes.services.js';
import ErrorHandler from '../../utils/ErrorHandler.js';
const { handleHttpError } = ErrorHandler;
const router = Router();
import {isTokenValid,verifyToken} from "../../Middelwares/Token.js";

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const variantes = await obtenerVariantes(id);
    res.json(variantes);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.post('/',verifyToken,isTokenValid, async (req: Request, res: Response) => {
  try {
    const nuevaVariante = await crearVariante(req.body);
    res.json(nuevaVariante);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.delete('/:id',verifyToken,isTokenValid, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const varianteEliminada = await eliminarVariante(id);
    res.json(varianteEliminada);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.put('/:id',verifyToken,isTokenValid, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const varianteModificada = await modificarVariante(id, req.body);
    res.json(varianteModificada);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

export default router;
