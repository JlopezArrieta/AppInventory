import { Router } from "express";
import { buscarProductos } from "../../controllers/producto/get.productos/get.productos";
import { crearProducto } from "../../controllers/producto/post.producto/post.producto";
import { buscarProducto } from "../../controllers/producto/getId.producto/getId.producto";
import { modificarProducto } from "../../controllers/producto/put.producto/put.producto";
import { cambioEstadoProducto } from "../../controllers/producto/disable.producto/disable.producto";

const productoRoute = Router();

productoRoute.get("/buscar", buscarProductos);
productoRoute.get("/buscar/:id", buscarProducto);
productoRoute.post("/crear", crearProducto);
productoRoute.put("/modificar/:id", modificarProducto);
productoRoute.put("/desactivar/:id", cambioEstadoProducto);


export default productoRoute;
