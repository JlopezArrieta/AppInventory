import { Router } from "express";
import { buscarFactura } from "../../controllers/factura/getId.factura";
import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";

const facturaRoute = Router();

facturaRoute.get("/buscar/:id", adminMiddlewares, buscarFactura);



export default facturaRoute;














