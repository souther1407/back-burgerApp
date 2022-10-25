import Router from "express";
const router = Router();
import { CLIENT_ERROR } from "../../httpCodes.js";
import { login } from "../services/auth.services.js";

router.post("/ingresar", async (req, res) => {
  const { nombre, clave } = req.body;
  try {
    const token = await login(nombre, clave);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(CLIENT_ERROR).json({ error: (error as Error).message });
  }
});

export default router;
