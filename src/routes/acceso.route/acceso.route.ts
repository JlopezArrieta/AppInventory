import { Router } from "express";

import { accesoUsuario } from "../../controllers/acceso/accesoUsuario.cllr";
import { emplMiddlewares } from "../../middlewares/emplMiddlewares/emplMiddlewares";


const accesoRoute = Router();

//AccederUsuario(login)
accesoRoute.post("/acceder", emplMiddlewares, accesoUsuario);


export default accesoRoute;


