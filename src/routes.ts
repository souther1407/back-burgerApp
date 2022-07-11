import { Express } from 'express';
import categoriasRouter from './Categorias/routes/categorias.routes.js';
import productosRouter from './Productos/routes/productos.routes.js';
import authRouter from './Auth/Routes/Auth.routes.js';
import variantesRouter from "./Variantes/routes/variantes.routes.js";

export default (app: Express) => {
  app.use('/categorias', categoriasRouter);
  app.use('/productos', productosRouter);
  app.use('/auth', authRouter);
  app.use("/variantes",variantesRouter);
};
