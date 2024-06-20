import { Router } from "express";

import { buscarCarrito } from "../../controllers/carrito/buscarCarrito/buscarCarrito";
import { agregarProductoCarrito } from "../../controllers/carrito/agregarProductoCarrito/agregarProductoCarrito";
import { actualizarProductoCarrito } from "../../controllers/carrito/actualizarProductoCarrito/actualizarProductoCarrito";
import { eliminarProductoDelCarrito } from "../../controllers/carrito/eliminarProductoDelCarrito/eliminarProductoDelCarrito";
import { eliminarCarrito } from "../../controllers/carrito/eliminarCarrito/eliminarCarrito";


const carritoRoute = Router();

carritoRoute.get("/buscar/:usuarioId", buscarCarrito);//Se busca todos los productos del Carrito
carritoRoute.post("/agregar", agregarProductoCarrito);
carritoRoute.put("/actualizar", actualizarProductoCarrito);
carritoRoute.delete("/eliminarpro/:usuarioId/:productoId", eliminarProductoDelCarrito);//Elimina un producto del Carrito.
carritoRoute.delete("/eliminarcar/:usuarioId", eliminarCarrito);//Elimina todos los productos del Carrito.


export default carritoRoute;



















