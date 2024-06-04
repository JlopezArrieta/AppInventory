import { Router } from "express";

import { eliminarUsuario } from "../../controllers/usuario/delete.usuario/delete.usuario.cllr";
import { buscarUsuarios } from "../../controllers/usuario/get.usuario/get.usuario.cllr";
import { buscarUsuario } from "../../controllers/usuario/getId.usuario/getId.usuario.cllr";
import { crearUsuario } from "../../controllers/usuario/post.usuario/post.usuario.cllr";
import { modificarUsuario } from "../../controllers/usuario/put.usuario/put.usuario.cllr";

import { adminMiddlewares } from "../../middlewares/adminMiddlewares/adminMiddlewares";
import { emplMiddlewares } from "../../middlewares/emplMiddlewares/emplMiddlewares";

const usuarioRoute = Router();

usuarioRoute.get("/buscar", adminMiddlewares, buscarUsuarios);
usuarioRoute.get("/buscar/:id", adminMiddlewares, buscarUsuario);
usuarioRoute.post("/crear", emplMiddlewares, crearUsuario);
usuarioRoute.put("/modificar/:id", adminMiddlewares, modificarUsuario);
usuarioRoute.delete("/eliminar/:id", adminMiddlewares, eliminarUsuario);



export default usuarioRoute;

















