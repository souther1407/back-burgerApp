import Router from 'express';
const router = Router();
import { validarPassword } from '../Auth.js';

router.post('/ingresar', (req, res) => {
  const { password } = req.body;
  try {
    const esValida = validarPassword(password);
    res.json({ esValida });
  } catch (error) {
    console.log(error);
  }
});

export default router;
