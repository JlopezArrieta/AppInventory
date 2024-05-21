import { Sequelize } from "sequelize-typescript";

import * as dotenv from 'dotenv';
import { Producto } from "../models/producto.model/producto.model";
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
    ]
})

async function connectionDB() {
    try {
        await connection.sync({ force: true });
        console.log("Base de dato sincronizada con Exito");
    } catch (error) {
        console.error("Error al sincronizar la base de datos", error);
    }
}

export default connectionDB;
//



