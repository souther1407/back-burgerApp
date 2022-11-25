import { Sequelize } from "sequelize";
import config from "../config/config.js";

const db = new Sequelize(
  config.DATABASE_URL!,
  config.DEV === "no"
    ? {
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
      }
    : {}
);

import usuariosModels from "../Usuarios/models/usuarios.models.js";
const Usuarios = usuariosModels(db);

import productosModel from "../Productos/model/productos.model.js";
const Productos = productosModel(db);

import categoriasModel from "../Categorias/model/categorias.model.js";
const Categorias = categoriasModel(db);

import variantesModel from "../Variantes/model/variantes.model.js";
const Variantes = variantesModel(db);

Usuarios.hasMany(Productos);
Usuarios.hasMany(Categorias);
Usuarios.hasMany(Variantes);
Productos.belongsTo(Usuarios);
Categorias.belongsTo(Usuarios);
Variantes.belongsTo(Usuarios);

Categorias.hasMany(Productos);
Productos.belongsTo(Categorias);

Productos.hasMany(Variantes);
Variantes.belongsTo(Productos);

export default db;
