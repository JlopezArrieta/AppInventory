import { Router } from "express";
import { crearFacturaVenta } from "../../controllers/facturaVenta/post.facturaVenta/post.facturaVenta.cllr";


const facturaVentaRoute = Router();

//facturaVentaRoute.get("/buscar", buscarFacturaVenta);
//facturaVentaRoute.get("/buscar/:id", buscarIdFacturaVenta);
facturaVentaRoute.post("/crear", crearFacturaVenta);


export default facturaVentaRoute;














