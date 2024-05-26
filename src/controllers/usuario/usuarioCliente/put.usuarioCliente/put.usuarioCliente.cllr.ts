import { RequestHandler } from "express";
import { Usuario } from "../../../../models/usuario.model/usuario.model";

interface ManejoRespuesta {
  message: string,
  usuarioModificado: Object,
  error: string,
}

export const modificarusuarioCliente: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const { nombres, numDocumento, direccion, telefono } = req.body;

    const usuarioModificado: Object = await Usuario.update(
      {
        nombres: nombres,
        numDocumento: numDocumento,
        direccion: direccion,
        telefono: telefono
      },
      {
        where: { id: id }
      }
    );
    if (!usuarioModificado) {
      return res
        .status(400)
        .json({ message: `Este Usuario con el Id: ${id} no existe en la base de datos` });
    }
    return res
      .status(200)
      .json({ message: "Cliente modificado con exito", usuarioModificado } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}












