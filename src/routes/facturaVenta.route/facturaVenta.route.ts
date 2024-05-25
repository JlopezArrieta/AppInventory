import { Router } from "express";
import { crearFacturaVenta } from "../../controllers/facturaVenta/post.facturaVenta/post.facturaVenta.cllr";
import { buscarFacturaVentas } from "../../controllers/facturaVenta/get.facturaVenta/get.facturaVenta.cllr";
import { buscarIdFacturaVenta } from "../../controllers/facturaVenta/getId.facturaVenta/getId.facturaVenta.cllr";
import { eliminarFacturaVenta } from "../../controllers/facturaVenta/delete.facturaVenta/delete.facturaVenta.cllr";


const facturaVentaRoute = Router();

facturaVentaRoute.get("/buscar", buscarFacturaVentas);
facturaVentaRoute.get("/buscar/:id", buscarIdFacturaVenta);
facturaVentaRoute.post("/crear", crearFacturaVenta);
facturaVentaRoute.delete("/eliminar/:id", eliminarFacturaVenta);


export default facturaVentaRoute;














