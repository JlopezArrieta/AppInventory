import { RequestHandler } from "express";
import { Usuario } from "../../../models/usuario.model/usuario.model";

interface ManejoRespuesta {
  message: string,
  usuarioDB: Usuario | null,
  error: string,
}

export const modificarUsuarioEmpAdm: RequestHandler = async (req, res) => {
  try {
    const id: string | number = req.params.id;
    const { nombres, numDocumento, direccion, telefono, correo, contrasena, rol } = req.body;

    const [usuarioModificar] = await Usuario.update(
      {
        nombres: nombres,
        numDocumento: numDocumento,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        contrasena: contrasena,
        rol: rol
      },
      {
        where: { id: id }
      }
    );
    if (usuarioModificar > 0) {
      const usuarioDB: Usuario | null = await Usuario.findByPk(id);
      return res
        .status(200)
        .json({ message: "usuario Modificaco con Exito", usuarioDB } as ManejoRespuesta);
    }
    return res
      .status(400)
      .json({ message: `El Usuario con el Id: ${id} no fue Modificado o no existe en la base de datos` } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}













