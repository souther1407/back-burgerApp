import db from "../../db/sequelize.js";
const { usuarios, sliders } = db.models;

interface Slider {
  url: string;
  desc?: string;
}
export const obtenerSliders = async (token: string) => {
  return await sliders.findAll({
    include: [{ model: usuarios, where: { token }, attributes: [] }],
  });
};

export const crearSlider = async (slider: Slider, usuarioId: string) => {
  return await sliders.create({ ...slider, usuarioId });
};

export const modificarSlider = async (
  sliderId: string,
  slider: object,
  usuarioId: string
) => {
  const modificado = await sliders.update(
    { ...slider },
    { where: { id: sliderId, usuarioId } }
  );
  const seModifico = modificado[0] > 0;
  return seModifico && sliders.findByPk(sliderId);
};

export const borrarSlider = async (sliderId: string, usuarioId: string) => {
  return await sliders.destroy({ where: { id: sliderId, usuarioId } });
};
