import { Router } from "express";

import { buscarProductos } from "../../controllers/producto/get.productos/get.productos.cller";
import { buscarProducto } from "../../controllers/producto/getId.producto/getId.producto.cller";
import { crearProducto } from "../../controllers/producto/post.producto/post.producto.cller";
import { actualizarProducto } from "../../controllers/producto/put.producto/put.producto.cller";
import { desactivarProducto } from "../../controllers/producto/desable.producto/desable.producto.cller";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";

const productoRoute = Router();

productoRoute.get("/buscar", adminMiddlewares, buscarProductos);
productoRoute.get("/buscar/:id", adminMiddlewares, buscarProducto);
productoRoute.post("/crear", adminMiddlewares, crearProducto);
productoRoute.put("/actualizar/:id", adminMiddlewares, actualizarProducto);
productoRoute.put("/desactivar/:id", adminMiddlewares, desactivarProducto);

// productoRoute.get("/buscar", buscarProductos);
// productoRoute.get("/buscar/:id", buscarProducto);
// productoRoute.post("/crear", crearProducto);
// productoRoute.put("/actualizar/:id", actualizarProducto);
// productoRoute.put("/desactivar/:id", desactivarProducto);


export default productoRoute;
