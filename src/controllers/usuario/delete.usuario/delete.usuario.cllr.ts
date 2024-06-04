import { RequestHandler } from "express";
import { Usuario } from "../../../models/usuario.model/usuario.model";

interface ManejoRespuesta {
  message: string,
  error: string,
}

export const eliminarUsuario: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const usuario: Object = await Usuario.destroy({
      where: {
        id: id
      }
    });
    if (usuario === 0) {
      return res
        .status(400)
        .json({ message: "El Usuario no existe en la base de datos" } as ManejoRespuesta);
    }
    return res
      .status(200)
      .json({ message: "Usuario Eliminado con Exito" } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}






