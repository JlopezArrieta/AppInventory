import { Router } from "express";

import { buscarCompras } from "../../controllers/compra/get.compras/get.compras.cllr";
import { crearCompra } from "../../controllers/compra/post.compra/post.compra.cllr";
import { desactivarCompra } from "../../controllers/compra/desable.compras/desable.compras.cllr";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { emplMiddlewares } from "../../middlewares/emplMiddlewares/emplMiddlewares";

const compraRoute = Router();

compraRoute.get("/buscar", adminMiddlewares, buscarCompras);
compraRoute.post("/crear", emplMiddlewares, crearCompra);
compraRoute.put("/desactivar/:compraId", adminMiddlewares, desactivarCompra);


export default compraRoute;