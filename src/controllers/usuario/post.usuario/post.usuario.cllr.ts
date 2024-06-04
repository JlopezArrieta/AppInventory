import { RequestHandler } from "express";
import { Usuario } from "../../../models/usuario.model/usuario.model";
import { hashPassword } from "../../../helper/handle.bcrypt";

interface ManejoRespuesta {
  message: string,
  crearUsuario: Usuario,
  error: any,
};

export const crearUsuario: RequestHandler = async (req, res) => {
  try {
    const { nombres, numDocumento, direccion, telefono, correo, contrasena, rol } = req.body;

    if (!nombres || !numDocumento || !direccion || !telefono || !correo || !contrasena || !rol) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const usuario: Usuario | null = await Usuario.findOne({
      where: {
        numDocumento: numDocumento,
        correo: correo
      }
    });

    if (usuario) {
      return res
        .status(403)
        .json({ message: "Este Usuario ya existe en la base de datos" } as ManejoRespuesta);
    }

    // let rolUsuario: string = '';
    // if (rol === "Empleado") {
    //   rolUsuario = "Empleado";
    // } else {
    //   rolUsuario = "Administrador";
    // }

    const contrasenaIncriptada: string = await hashPassword(contrasena);

    const crearUsuario: Usuario = await Usuario.create({
      nombres: nombres,
      numDocumento: numDocumento,
      direccion: direccion,
      telefono: telefono,
      correo: correo,
      contrasena: contrasenaIncriptada,
      rol: rol
    });
    return res

      .status(200)
      .json({ message: `Usuario ${rol} creado con exito`, crearUsuario } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}
















