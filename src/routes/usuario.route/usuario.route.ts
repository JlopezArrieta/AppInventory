import { Router } from "express";

//UsuarioCliente
import { crearUsuarioCliente } from "../../controllers/usuario/usuarioCliente/post.usuarioCliente/post.usuarioCliente.cllr";
import { modificarusuarioCliente } from "../../controllers/usuario/usuarioCliente/put.usuarioCliente/put.usuarioCliente.cllr";

//UsuarioEmpAdm
import { buscarUsuariosEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/get.usuarioEmpAdm/get.usuarioEmpAdm.cllr";
import { buscarUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/getId.usuarioEmpAdm/getId.usuarioEmpAdm.cllr";
import { crearUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/post.usuarioEmpAdm/post.usuarioEmpAdm.cllr";
import { modificarUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/put.usuarioEmpAdm/put.usuarioEmpAdm.cllr";
import { eliminarUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/delete.usuarioEmpAdm/delete.usuarioEmpAdm.cllr";

const usuarioRoute = Router();

//UsuarioCliente
usuarioRoute.post("/crearcli", crearUsuarioCliente);
usuarioRoute.put("modificarcli/:id", modificarusuarioCliente);

//UsuarioEmpAdm
usuarioRoute.get("/buscar", buscarUsuariosEmpAdm);
usuarioRoute.get("/buscar/:id", buscarUsuarioEmpAdm);
usuarioRoute.post("/crear", crearUsuarioEmpAdm);
usuarioRoute.put("/modificar/:id", modificarUsuarioEmpAdm);
usuarioRoute.delete("/eliminar/:id", eliminarUsuarioEmpAdm);

export default usuarioRoute;

















