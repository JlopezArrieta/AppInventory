import { Router } from "express";
// import { buscarCompras } from "../../controllers/compra/get.compra/get.compra.cllr";
// import { buscarCompra } from "../../controllers/compra/getId.compra/getId.compra.cllr";
import { crearCompra } from "../../controllers/compra/post.compra/post.compra.cllr";
// import { eliminarCompra } from "../../controllers/compra/delete.compra/delete.compra.cllr";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { emplMiddlewares } from "../../middlewares/emplMiddlewares/emplMiddlewares";

const compraRoute = Router();

// compraRoute.get("/buscar", adminMiddlewares, buscarCompras);
// compraRoute.get("/buscar/:id", adminMiddlewares, buscarCompra);
compraRoute.post("/crear", emplMiddlewares, crearCompra);
// compraRoute.delete("/eliminar/:id", adminMiddlewares, eliminarCompra);


export default compraRoute;