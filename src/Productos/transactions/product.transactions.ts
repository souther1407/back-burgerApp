import { crear } from "../services/productos.services.js";
import db from "../../db/sequelize.js";
const { variantes: variantesModel } = db.models;

export const createProductAndVariants = async (
  usuario: any,
  { producto, variantes }: { producto: any; variantes: any }
) => {
  const result = await db.transaction(async (t) => {
    const product: any = await crear(producto, usuario, t);
    const createdVariants = await Promise.all(
      variantes.map((v: any) =>
        variantesModel.create(
          { ...v, usuarioId: usuario.id, productoId: product.id },
          { transaction: t }
        )
      )
    );
    await product.setVariantes(createdVariants);
    return product;
  });
  return result;
};
