import db from '../../db/sequelize.js';

const { variantes, productos } = db.models;

interface Variante {
  titulo: string;
  precio: number;
  productoId: number;
}

export async function obtenerVariantes(id: string) {
  const producto = await productos.findByPk(id);
  if (producto) {
    return await (producto as any).getVariantes();
  }
  throw new Error('No se ha podido encontrar el producto');
}

export async function crearVariante(body: Variante) {
  return await variantes.create({ ...body });
}

export async function eliminarVariante(id: string) {
  return await variantes.destroy({
    where: {
      id,
    },
  });
}

export async function modificarVariante(id: string, body: Variante) {
  const varianteModificada = await variantes.update(
    { ...body },
    { where: { id } }
  );
  const seEdito = varianteModificada[0] > 0;
  return seEdito && (await variantes.findByPk(id));
}
