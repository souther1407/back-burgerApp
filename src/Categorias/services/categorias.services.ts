import db from "../../db/sequelize.js";
const {categorias} = db.models;


export async function obtenerCategorias(){
   return await categorias.findAll(); 
}

interface Categoria{
   titulo:string,
   subtitulo?:string,
   imagen?:string
}

export async function crearCategoria(datos:Categoria) {
   return await categorias.create({...datos});
}

export async function editarCategoria(datos:Categoria,id:string) {
   const result = await categorias.update({...datos},{where:{id}});
   const seEdito = result[0] > 0;
   return seEdito && await categorias.findByPk(id);
}

export async function borrarCategoria(id:string) {
   return await categorias.destroy({where:{id}});
}