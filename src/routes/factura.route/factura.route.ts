import { Router } from "express";
import { buscarFactura } from "../../controllers/factura/getId.factura";
import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";

const facturaRoute = Router();

facturaRoute.get("/buscar/:id", adminMiddlewares, buscarFactura);

//facturaRoute.get("/buscar/:id", buscarFactura);


export default facturaRoute;














