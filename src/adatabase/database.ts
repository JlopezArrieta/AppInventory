import { Sequelize } from "sequelize-typescript";

import * as dotenv from 'dotenv';
dotenv.config();

import { Usuario } from "../models/usuario.model/usuario.model";
import { Producto } from "../models/producto.model/producto.model";
import { Carrito } from "../models/carrito.model/carrito.model";
import { Detalle } from "../models/detalle.model/detalle.model";
import { Compra } from "../models/compra.model/compra.model";
import { Factura } from "../models/factura.model/factura.model";
import { Inventario } from "../models/inventario.model/inventario.model";


const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const connection = new Sequelize({
  dialect: "mysql",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging: false,
  models: [
    Usuario,
    Producto,
    Carrito,
    Factura,
    Compra,
    Detalle,
    Inventario
  ]
})

async function connectionDB() {
  try {
    await connection.sync({ alter: true }); //force: false  //alter: true
    console.log("Base de dato sincronizada con Exito");
  } catch (error) {
    console.error("Error al sincronizar la base de datos", error);
  }
}

export default connectionDB;




