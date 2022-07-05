import { Sequelize } from 'sequelize';
const db = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

import productosModel from '../Productos/model/productos.model.js';
const Productos = productosModel(db);

import categoriasModel from '../Categorias/model/categorias.model.js';
const Categorias = categoriasModel(db);

Categorias.hasMany(Productos);
Productos.belongsTo(Categorias);

export default db;
