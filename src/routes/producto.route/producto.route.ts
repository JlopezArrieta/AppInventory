import { Router } from "express";
import { buscarProductos } from "../../controllers/producto/get.productos/get.productos.cller";
import { buscarProducto } from "../../controllers/producto/getId.producto/getId.producto.cller";
import { crearProducto } from "../../controllers/producto/post.producto/post.producto.cller";
import { modificarProducto } from "../../controllers/producto/put.producto/put.producto.cller";
import { cambioEstadoProducto } from "../../controllers/producto/disable.producto/disable.producto.cller";

const productoRoute = Router();

productoRoute.get("/buscar", buscarProductos);
productoRoute.get("/buscar/:id", buscarProducto);
productoRoute.post("/crear", crearProducto);
productoRoute.put("/modificar/:id", modificarProducto);
productoRoute.put("/desactivar/:id", cambioEstadoProducto);


export default productoRoute;
