import { Router } from "express";
import usuarioRoute from "./usuario.route/usuario.route";
import productoRoute from "./producto.route/producto.route";
import compraRoute from "./compra.route/compra.route";
import facturaVentaRoute from "./facturaVenta.route/facturaVenta.route";

const routes = Router();

routes.use("/usuario", usuarioRoute);
routes.use("/producto", productoRoute);
routes.use("/comprar", compraRoute);
routes.use("/factura", facturaVentaRoute);

export default routes;
