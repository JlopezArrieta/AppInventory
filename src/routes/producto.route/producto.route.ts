import { Router } from "express";

import { buscarProductos } from "../../controllers/producto/get.productos/get.productos.cller";
import { buscarProducto } from "../../controllers/producto/getId.producto/getId.producto.cller";
import { crearProducto } from "../../controllers/producto/post.producto/post.producto.cller";
import { actualizarProducto } from "../../controllers/producto/put.producto/put.producto.cller";
import { eliminarProducto } from "../../controllers/producto/delete.producto/delete.producto.cller";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";

const productoRoute = Router();

productoRoute.get("/buscar", adminMiddlewares, buscarProductos);
productoRoute.get("/buscar/:id", adminMiddlewares, buscarProducto);
productoRoute.post("/crear", adminMiddlewares, crearProducto);
productoRoute.put("/actualizar/:id", adminMiddlewares, actualizarProducto);
productoRoute.delete("/eliminar/:id", adminMiddlewares, eliminarProducto);

// productoRoute.get("/buscar", buscarProductos);
// productoRoute.get("/buscar/:id", buscarProducto);
// productoRoute.post("/crear", crearProducto);
// productoRoute.put("/actualizar/:id", actualizarProducto);
// productoRoute.put("/eliminar/:id", eliminarProducto);


export default productoRoute;
