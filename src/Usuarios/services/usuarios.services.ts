import db from "../../db/sequelize.js";
import { generateToken } from "../../utils/generateToken.js";
const { usuarios } = db.models;

export const createUser = async (user: { nombre: string; clave: string }) => {
  const newUser: any = await usuarios.create({
    ...user,
    token: generateToken(user.nombre, user.clave),
  });
  return {
    id: newUser.id,
    nombre: newUser.nombre,
    token: newUser.token,
  };
};
