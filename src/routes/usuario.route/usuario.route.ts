import { Router } from "express";//

import { buscarUsuarios } from "../../controllers/usuario/get.usuario/get.usuario.cllr";
import { buscarUsuario } from "../../controllers/usuario/getId.usuario/getId.usuario.cllr";
import { crearUsuario } from "../../controllers/usuario/post.usuario/post.usuario.cllr";
import { actualizarUsuario } from "../../controllers/usuario/put.usuario/put.usuario.cllr";
import { eliminarUsuario } from "../../controllers/usuario/delete.usuario/delete.usuario.cllr";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { emplMiddlewares } from "../../middlewares/emplMiddlewares/emplMiddlewares";

const usuarioRoute = Router();

usuarioRoute.get("/buscar", adminMiddlewares, buscarUsuarios);
usuarioRoute.get("/buscar/:id", adminMiddlewares, buscarUsuario);
usuarioRoute.post("/crear", emplMiddlewares, crearUsuario);
usuarioRoute.put("/actualizar/:id", adminMiddlewares, actualizarUsuario);
usuarioRoute.delete("/eliminar/:id", adminMiddlewares, eliminarUsuario);

// usuarioRoute.get("/buscar", buscarUsuarios);
// usuarioRoute.get("/buscar/:id", buscarUsuario);
//usuarioRoute.post("/crear", crearUsuario);
// usuarioRoute.put("/actualizar/:id", modificarUsuario);
// usuarioRoute.delete("/eliminar/:id", eliminarUsuario);



export default usuarioRoute;

















