import { RequestHandler } from "express";
import { Usuario } from "../../models/usuario.model/usuario.model";
import { comparePassword } from "../../helper/handle.bcrypt";

interface ManejoRespuesta {//
  message: string,
  usuario: Usuario | null,
  error?: any
}

interface ProductoReqBody {
  correo: string,
  contrasena: string
}

export const accesoUsuario: RequestHandler = async (req, res) => {
  try {
    const { correo, contrasena }: ProductoReqBody = req.body;

    if (!correo || !contrasena) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" } as ManejoRespuesta);
    }

    const usuario: Usuario | null = await Usuario.findOne({
      where: {
        correo: correo
      }
    });

    if (!usuario) {
      return res
        .status(200)
        .json({ message: "Usuario no encontrado, debe registrarse" } as ManejoRespuesta);
    }

    const chequeoContrasena: Object = await comparePassword(contrasena, usuario.contrasena);
    if (chequeoContrasena) {
      return res
        .status(200)
        .json({ message: "Usuario accedio correctamente", usuario: usuario } as ManejoRespuesta);
    } else {
      return res
        .status(200)
        .json({ message: "Contrasena Incorrecta" } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}










