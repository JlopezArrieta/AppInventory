import { Router } from "express";
import { buscarCompras } from "../../controllers/compra/get.compra/get.compra.cllr";
import { buscarCompra } from "../../controllers/compra/getId.compra/getId.compra.cllr";
import { crearCompra } from "../../controllers/compra/post.compra/post.compra.cllr";
import { eliminarCompra } from "../../controllers/compra/delete.compra/delete.compra.cllr";

const compraRoute = Router();

compraRoute.get("/buscar", buscarCompras);
compraRoute.get("/buscar/:id", buscarCompra);
compraRoute.post("/crear", crearCompra);
compraRoute.delete("/eliminar/:id", eliminarCompra);


export default compraRoute;