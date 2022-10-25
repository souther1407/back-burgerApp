import db from "../../db/sequelize.js";

const { variantes, productos, usuarios } = db.models;

interface Variante {
  titulo: string;
  precio: number;
  productoId: number;
}

export async function obtenerVariantes(id: string, token: string) {
  const producto = await productos.findOne({
    where: { id },
    include: { model: usuarios, where: { token }, attributes: [] },
  });
  if (producto) {
    return await (producto as any).getVariantes();
  }
  throw new Error("No se ha podido encontrar el producto");
}

export async function crearVariante(
  body: Variante,
  user: { id: string; token: string }
) {
  const existeVariante = await productos.findOne({
    where: { usuarioId: user.id, id: body.productoId },
  });
  if (!existeVariante) throw new Error("no existe el producto");
  return await variantes.create({ ...body, usuarioId: user.id });
}

export async function eliminarVariante(
  id: string,
  user: { id: string; token: string }
) {
  return await variantes.destroy({
    where: {
      id,
      usuarioId: user.id,
    },
  });
}

export async function modificarVariante(
  id: string,
  user: { id: string; token: string },
  body: Variante
) {
  const varianteModificada = await variantes.update(
    { ...body },
    { where: { id, usuarioId: user.id } }
  );
  const seEdito = varianteModificada[0] > 0;
  return (
    seEdito && (await variantes.findOne({ where: { id, usuarioId: user.id } }))
  );
}
