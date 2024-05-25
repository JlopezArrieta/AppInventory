import { Router } from "express";
import productoRoute from "./producto.route/producto.route";
import facturaVentaRoute from "./facturaVenta.route/facturaVenta.route";
import compraRoute from "./compra.route/compra.route";

const routes = Router();

routes.use("/producto", productoRoute);
routes.use("/comprar", compraRoute);
routes.use("/factura", facturaVentaRoute);

export default routes;