import { Router } from "express";

import { accesoUsuario } from "../../controllers/acceso/accesoUsuario.cllr";


const accesoRoute = Router();

//AccederUsuario(login)
accesoRoute.post("/acceder", accesoUsuario);


export default accesoRoute;


