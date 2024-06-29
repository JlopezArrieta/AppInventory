import { Router } from "express";

import { buscarInventarios } from "../../controllers/inventario/get.inventario/get.inventario.cllr";
import { buscarInventario } from "../../controllers/inventario/getId.inventario/getId.inventario.cllr";
import { crearInventario } from "../../controllers/inventario/post.inventario/post.inventario.cllr";
import { actualizarInventario } from "../../controllers/inventario/put.inventario/put.inventario.cllr";
import { desableInventario } from "../../controllers/inventario/desable.inventario/desable.inventario.cllr";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";

const inventarioRoute = Router();

inventarioRoute.get("/buscar", adminMiddlewares, buscarInventarios);
inventarioRoute.get("/buscar/:id", adminMiddlewares, buscarInventario);
inventarioRoute.post("/crear", adminMiddlewares, crearInventario);
inventarioRoute.put("/actualizar/:id", adminMiddlewares, actualizarInventario);
inventarioRoute.put("/desactivar/:id", adminMiddlewares, desableInventario);

// inventarioRoute.get("/buscar", buscarInventarios);
// inventarioRoute.get("/buscar/:id", buscarInventario);
// inventarioRoute.get("/crear", crearInventario);
// inventarioRoute.get("/actualizar/:id", actualizarInventario);
// inventarioRoute.get("/desactivar/:id", desableInventario);

export default inventarioRoute;








