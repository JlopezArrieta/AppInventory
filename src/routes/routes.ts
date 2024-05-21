import { Router } from "express";
import productoRoute from "./producto.route/producto.route";

const routes = Router();

routes.use("/producto", productoRoute);

export default routes;