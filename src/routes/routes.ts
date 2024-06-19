import { Router } from "express";
import usuarioRoute from "./usuario.route/usuario.route";
import productoRoute from "./producto.route/producto.route";
import carritoRoute from "./carrito.route/carrito.route";
// import compraRoute from "./compra.route/compra.route";
//import facturaRoute from "./factura.route/factura.route";
import accesoRoute from "./acceso.route/acceso.route";


const routes = Router();

routes.use("/usuario", usuarioRoute);
routes.use("/producto", productoRoute);
routes.use("/carrito", carritoRoute);
// routes.use("/comprar", compraRoute);
//routes.use("/factura", facturaRoute);
routes.use("/autenticar", accesoRoute);

export default routes;
