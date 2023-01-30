import db from "../../db/sequelize.js";
import { Transaction } from "sequelize";
const { productos, categorias, variantes, usuarios } = db.models;

interface Producto {
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export async function obtenerProductos(token: string) {
  return await productos.findAll({
    include: [
      { model: variantes },
      { model: usuarios, where: { token }, attributes: [] },
    ],
  });
}

export async function crear(
  datos: Producto,
  usuario: { id: number; token: string },
  t?: Transaction
) {
  return await productos.create(
    { ...datos, usuarioId: usuario.id },
    { transaction: t }
  );
}

export async function modificar(
  datos: Producto,
  id: string,
  user: { id: string; token: string }
) {
  const modificado = await productos.update(
    { ...datos },
    { where: { id, usuarioId: user.id } }
  );
  const seModifico = modificado[0] > 0;
  return seModifico && (await productos.findByPk(id));
}

export async function borrar(
  id: string,
  usuario: { id: string; token: string }
) {
  return await productos.destroy({ where: { id, usuarioId: usuario.id } });
}
