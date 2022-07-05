import dotenv from 'dotenv';
dotenv.config();
const { PASSWORD } = process.env;

export const validarPassword = (password: string) => {
  if (password === PASSWORD) {
    return true;
  }
  return false;
};
