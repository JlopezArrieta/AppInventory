import { Router } from "express";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { buscarVentasPorEmpleados } from "../../controllers/vendedor/vendedor.cllr";

const vendedorRoute = Router();

vendedorRoute.get("/buscar/:empleadoId", adminMiddlewares, buscarVentasPorEmpleados);


export default vendedorRoute;














