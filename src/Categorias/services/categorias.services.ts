import db from "../../db/sequelize.js";
const { categorias, usuarios } = db.models;

export async function obtenerCategorias(token: string) {
  return await categorias.findAll({
    include: { model: usuarios, where: { token }, attributes: [] },
  });
}

interface Categoria {
  titulo: string;
  subtitulo?: string;
  imagen?: string;
}

export async function crearCategoria(
  datos: Categoria,
  user: { id: string; token: string }
) {
  return await categorias.create({ ...datos, usuarioId: user.id });
}

export async function editarCategoria(
  datos: Categoria,
  id: string,
  user: { id: string; token: string }
) {
  const result = await categorias.update(
    { ...datos },
    { where: { id, usuarioId: user.id } }
  );
  const seEdito = result[0] > 0;
  return (
    seEdito && (await categorias.findOne({ where: { id, usuarioId: user.id } }))
  );
}

export async function borrarCategoria(
  id: string,
  user: { id: string; token: string }
) {
  return await categorias.destroy({ where: { id, usuarioId: user.id } });
}
