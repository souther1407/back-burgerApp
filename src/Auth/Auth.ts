import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();
const { PASSWORD,SECRET } = process.env;

export const validarPassword = (password: string) => {
  if (password === PASSWORD) {
    return jwt.sign(password,SECRET as string);
  }
  return false;
};
