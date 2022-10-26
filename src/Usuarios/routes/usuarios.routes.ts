import { Router, Request, Response } from "express";
import { isTokenValid, verifyToken } from "../../Middelwares/Token.js";
import { CLIENT_ERROR, OK } from "../../httpCodes.js";
import { createUser } from "../services/usuarios.services.js";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(OK).json({ ...newUser, clave: undefined });
  } catch (error) {
    res.status(CLIENT_ERROR).json({ error });
  }
});

export default router;
