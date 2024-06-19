import { RequestHandler } from "express";
import { Usuario } from "../../../models/usuario.model/usuario.model";

interface ManejoRespuesta {
  message: string,
  usuarioDB: Usuario | null,
  error: string,
}

interface ProductoReqBody {
  nombresApellidos: string;
  numDocumento: number;
  direccion: string;
  telefono: string;
  correo: string;
  contrasena: string;
  rol: string;
}

export const modificarUsuario: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const { nombresApellidos, numDocumento, direccion, telefono, correo, contrasena, rol }: ProductoReqBody = req.body;

    const [usuarioModificar] = await Usuario.update(
      {
        nombresApellidos: nombresApellidos,
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













