import { RequestHandler } from "express";
import { Usuario } from "../../../models/usuario.model/usuario.model";

interface ManejoRespuesta {
  message: string,
  usuario: Usuario | null,
  error: string,
}

export const buscarUsuario: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const usuario: Usuario | null = await Usuario.findByPk(id);

    if (!usuario) {
      return res
        .status(400)
        .json({ message: `No existen usuario con Id: ${id} en a base de datos` } as ManejoRespuesta);
    }
    return res
      .status(200)
      .json({ message: "Usuario es:", usuario } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}














