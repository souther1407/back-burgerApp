import { Router, Request, Response } from 'express';
import {
  obtenerProductos,
  crear,
  modificar,
  borrar,
} from '../services/productos.services.js';
import ErrorHandler from '../../utils/ErrorHandler.js';
const { handleHttpError } = ErrorHandler;
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.post('/', async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const nuevoProducto = await crear(req.body);
    res.json(nuevoProducto);
  } catch (error) {
    console.log('ERROR', error as Error);
    handleHttpError(error as Error, res);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const modifacado = await modificar(req.body, id);
    res.json(modifacado);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const borrado = await borrar(id);
    res.json({ deleted: borrado > 0 });
  } catch (error) {
    handleHttpError(error as Error, res);
  }
});

export default router;
