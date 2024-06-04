import { Router } from "express";
import { crearFacturaVenta } from "../../controllers/facturaVenta/post.facturaVenta/post.facturaVenta.cllr";
import { buscarFacturaVentas } from "../../controllers/facturaVenta/get.facturaVenta/get.facturaVenta.cllr";
import { buscarIdFacturaVenta } from "../../controllers/facturaVenta/getId.facturaVenta/getId.facturaVenta.cllr";
import { eliminarFacturaVenta } from "../../controllers/facturaVenta/delete.facturaVenta/delete.facturaVenta.cllr";
import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { emplMiddlewares } from "../../middlewares/emplMiddlewares/emplMiddlewares";


const facturaVentaRoute = Router();

facturaVentaRoute.get("/buscar", adminMiddlewares, buscarFacturaVentas);
facturaVentaRoute.get("/buscar/:id", adminMiddlewares, buscarIdFacturaVenta);
facturaVentaRoute.post("/crear", emplMiddlewares, crearFacturaVenta);
facturaVentaRoute.delete("/eliminar/:id", adminMiddlewares, eliminarFacturaVenta);


export default facturaVentaRoute;














