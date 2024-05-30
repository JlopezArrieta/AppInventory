import { Router } from "express";

//UsuarioCliente
import { crearUsuarioCliente } from "../../controllers/usuario/usuarioCliente/post.usuarioCliente/post.usuarioCliente.cllr";

//UsuarioEmpAdm
import { buscarUsuariosEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/get.usuarioEmpAdm/get.usuarioEmpAdm.cllr";
import { buscarUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/getId.usuarioEmpAdm/getId.usuarioEmpAdm.cllr";
import { crearUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/post.usuarioEmpAdm/post.usuarioEmpAdm.cllr";
import { modificarUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/put.usuarioEmpAdm/put.usuarioEmpAdm.cllr";
import { eliminarUsuarioEmpAdm } from "../../controllers/usuario/usuarioEmpAdm/delete.usuarioEmpAdm/delete.usuarioEmpAdm.cllr";

//AccesoUsuario
import { accesoUsuario } from "../../controllers/acceso/accesoUsuario.cllr";

const usuarioRoute = Router();

//UsuarioCliente
usuarioRoute.post("/crearcli", crearUsuarioCliente);

//UsuarioEmpAdm
usuarioRoute.get("/buscar", buscarUsuariosEmpAdm);
usuarioRoute.get("/buscar/:id", buscarUsuarioEmpAdm);
usuarioRoute.post("/crear", crearUsuarioEmpAdm);
usuarioRoute.put("/modificar/:id", modificarUsuarioEmpAdm);
usuarioRoute.delete("/eliminar/:id", eliminarUsuarioEmpAdm);

//AccederUsuario(login)
usuarioRoute.post("/acceder", accesoUsuario);

export default usuarioRoute;

















