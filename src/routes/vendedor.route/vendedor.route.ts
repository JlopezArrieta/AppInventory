import { Router } from "express";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { buscarVentasPorEmpleados } from "../../controllers/vendedor/get.vendedor.cllr";

const vendedorRoute = Router();

vendedorRoute.get("/buscarvend/:empleadoId", adminMiddlewares, buscarVentasPorEmpleados);


export default vendedorRoute;














