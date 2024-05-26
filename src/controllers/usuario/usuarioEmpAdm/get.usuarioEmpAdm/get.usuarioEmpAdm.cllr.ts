import { RequestHandler } from "express";
import { Usuario } from "../../../../models/usuario.model/usuario.model";

interface ManejoRespuesta {
  message: string,
  usuariosDB: Usuario[],
  error: string,
}

export const buscarUsuariosEmpAdm: RequestHandler = async (req, res) => {
  try {
    const usuariosDB: Usuario[] = await Usuario.findAll();
    if (!usuariosDB) {
      return res
        .status(400)
        .json({ message: "No existen usuarios creados en a base de datos" } as ManejoRespuesta);
    }
    return res
      .status(200)
      .json({ message: "Lista de Usuarios", usuariosDB } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}













