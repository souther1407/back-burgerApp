import db from "../../db/sequelize.js";
const {productos,categorias} = db.models;

interface Producto{
    titulo:string,
    descripcion:string,
    precio:number,
    imagen:string,
}

export async function obtenerProductos() {
    return await productos.findAll();
}

export async function crear(datos:Producto) {
    return await productos.create({...datos})
}

export async function modificar(datos:Producto,id:string) {
    const modificado = await productos.update({...datos},{where:{id}});
    const seModifico = modificado[0] > 0;
    return seModifico && await productos.findByPk(id);
}

export async function borrar(id:string){
    return await productos.destroy({where:{id}});
}