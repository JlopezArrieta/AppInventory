import { Router } from "express";
import productoRoute from "./producto.route/producto.route";
import facturaVentaRoute from "./facturaVenta.route/facturaVenta.route";

const routes = Router();

routes.use("/producto", productoRoute);
routes.use("/factura", facturaVentaRoute);

export default routes;