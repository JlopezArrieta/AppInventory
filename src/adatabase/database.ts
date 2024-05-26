import { Sequelize } from "sequelize-typescript";

import * as dotenv from 'dotenv';
import { Producto } from "../models/producto.model/producto.model";
import { FacturaVenta } from "../models/facturaVenta.model/facturaVenta.model";
import { Compra } from "../models/compra.model/compra.model";
import { CompraProducto } from "../models/compra.model/compraProducto.model";
import { FacturaVentaCompra } from "../models/facturaVenta.model/FacturaVentaCompra.model";
import { Usuario } from "../models/usuario.model/usuario.model";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const connection = new Sequelize({
    dialect: "mysql",
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    logging: false,
    models: [
        Producto,
        FacturaVenta,
        Compra,
        CompraProducto,
        FacturaVentaCompra,
        Usuario,
    ]
})

async function connectionDB() {
    try {
        await connection.sync({ force: false });
        console.log("Base de dato sincronizada con Exito");
    } catch (error) {
        console.error("Error al sincronizar la base de datos", error);
    }
}

export default connectionDB;
//



