import express from "express";
const app = express();
import Logger from "./utils/Logger.js";
import db from "./db/sequelize.js";
import cors from "cors";
import config from "./config/config.js";
import { generateToken } from "./utils/generateToken.js";
const { productos, categorias, variantes, usuarios } = db.models;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

import setearRutas from "./routes.js";
setearRutas(app);

app.listen(config.PORT, async () => {
  Logger.success("listening at port " + config.PORT);
  await db.sync({ force: true });
  //aaa
  Logger.success("db created");

  await usuarios.create({
    nombre: "user1",
    clave: "12345",
    token: generateToken("user1", "12345"),
  });

  await categorias.bulkCreate([
    {
      titulo: "Promos",
      subtitulo: "aprovecha los mejores precios",
      usuarioId: 1,
    },
    {
      titulo: "Hamburguesas",
      usuarioId: 1,
    },
    {
      titulo: "Nuggets",
      usuarioId: 1,
    },
  ]);

  await productos.bulkCreate([
    {
      titulo: "Promo Enero",
      descripcion:
        "Más que una promo es un regalo. Blend de Carne de 125g, doble cheddar, mayonesa, mostaza y Ketchup. Simple, sin porción de papas",
      precio: 350,
      imagen:
        "https://okdiario.com/img/2021/12/09/hamburguesas-caseras-rellenas-de-queso-cheddar.jpg",
      categoriaId: 1,
      usuarioId: 1,
    },
    {
      titulo: "Promo Febrero",
      descripcion:
        "Más que una promo es un regalo. Blend de Carne de 200g, triple cheddar, mayonesa, mostaza y Ketchup. Simple, sin porción de papas",
      precio: 500,
      imagen: "https://pbs.twimg.com/media/D2xbqDzX0AEvISJ.jpg:large",
      categoriaId: 1,
      usuarioId: 1,
    },
    {
      titulo: "Superburger",
      descripcion:
        "Hamburguesa triple con cheddar bacon crujiente, salsa cremolati, cebolla caramelizada",
      precio: 1500,
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjq5qmQwi_dBn5Z5s6CtRd7cUW5yRNBH5mw&usqp=CAU",
      categoriaId: 2,
      usuarioId: 1,
    },
    {
      titulo: "Hiperburguer",
      descripcion:
        "Hamburguesa triple con cheddar bacon crujiente, salsa cremolati, cebolla caramelizada",
      precio: 1200,
      imagen:
        "https://chefeel.com/chefgeneralfiles/2021/07/front-view-burger-on-stand-scaled-880x587.jpg",
      categoriaId: 2,
      usuarioId: 1,
    },
    {
      titulo: "Nuggets de pollo",
      descripcion: "Nuggets de pollo con salsa barbacoa y cheddar",
      precio: 800,
      imagen:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/que-comes-cuando-comes-nuggets-elle-1629456066.jpg",
      categoriaId: 3,
      usuarioId: 1,
    },
    {
      titulo: "Nuggets HD",
      descripcion:
        "Nuggets de pollo con puré de papas y ensalada de lechuga,tomate",
      precio: 900,
      imagen:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/que-comes-cuando-comes-nuggets-elle-1629456066.jpg",
      categoriaId: 3,
      usuarioId: 1,
    },
  ]);

  await variantes.bulkCreate([
    { titulo: "Simple", precio: 150, productoId: 1, usuarioId: 1 },
    { titulo: "Doble", precio: 250, productoId: 1, usuarioId: 1 },
    { titulo: "Triple", precio: 350, productoId: 1, usuarioId: 1 },
    { titulo: "Simple", precio: 150, productoId: 2, usuarioId: 1 },
    { titulo: "Doble", precio: 250, productoId: 2, usuarioId: 1 },
    { titulo: "Triple", precio: 350, productoId: 2, usuarioId: 1 },
  ]);
});
