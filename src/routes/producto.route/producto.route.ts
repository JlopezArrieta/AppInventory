import { Router } from "express";
import { buscarProductos } from "../../controllers/producto/get.productos/get.productos.cller";
import { buscarProducto } from "../../controllers/producto/getId.producto/getId.producto.cller";
import { crearProducto } from "../../controllers/producto/post.producto/post.producto.cller";
import { modificarProducto } from "../../controllers/producto/put.producto/put.producto.cller";
import { cambioEstadoProducto } from "../../controllers/producto/disable.producto/disable.producto.cller";
import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";

const productoRoute = Router();

productoRoute.get("/buscar", adminMiddlewares, buscarProductos);
productoRoute.get("/buscar/:id", adminMiddlewares, buscarProducto);
productoRoute.post("/crear", adminMiddlewares, crearProducto);
productoRoute.put("/modificar/:id", adminMiddlewares, modificarProducto);
productoRoute.put("/desactivar/:id", adminMiddlewares, cambioEstadoProducto);


export default productoRoute;
