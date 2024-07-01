import { Router } from "express";
import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { buscarFactura } from "../../controllers/factura/getId.factura/getId.factura.cllr";
import { desactivarFactura } from "../../controllers/factura/desable.factura/desable.factura.cllr";

const facturaRoute = Router();

facturaRoute.get("/buscar/:id", adminMiddlewares, buscarFactura);
facturaRoute.put("/desactivar/:id", adminMiddlewares, desactivarFactura);

//facturaRoute.get("/buscar/:id", buscarFactura);


export default facturaRoute;














