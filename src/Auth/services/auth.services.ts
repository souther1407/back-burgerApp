import db from "../../db/sequelize.js";
const { usuarios } = db.models;
import jwt from "jsonwebtoken";
import { hashPassword } from "../../utils/hashPassword.js";
import config from "../../config/config.js";

export const login = async (nombre: string, clave: string) => {
  const existeUsuario: any = await usuarios.findOne({
    where: { nombre, clave: hashPassword(clave) },
  });
  if (!existeUsuario) throw new Error("no existe el usuario");
  return generarToken(existeUsuario.id, existeUsuario.token);
};

const generarToken = (usuarioId: number, userToken: string) => {
  const token = jwt.sign(
    { id: usuarioId, token: userToken },
    config.TOKEN_SECRET!
  );
  return token;
};
