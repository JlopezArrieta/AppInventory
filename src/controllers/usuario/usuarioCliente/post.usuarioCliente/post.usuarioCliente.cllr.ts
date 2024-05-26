import { RequestHandler } from "express";
import { Usuario } from "../../../../models/usuario.model/usuario.model";

interface ManejoRespuesta {
  message: string,
  usuarioCliente: Usuario,
  error: any,
};

export const crearUsuarioCliente: RequestHandler = async (req, res) => {
  try {
    const { nombres, numDocumento, direccion, telefono } = req.body;

    if (!nombres || !numDocumento || !direccion || !telefono) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const usuarioDB: Usuario | null = await Usuario.findOne({
      where: {
        numDocumento: numDocumento,
        rol: "Cliente",
      }
    });

    if (usuarioDB) {
      return res
        .status(403)
        .json({ message: "Este Usuario ya existe en la base de datos" });
    }

    const usuarioCliente: Usuario = await Usuario.create({
      nombres: nombres,
      numDocumento: numDocumento,
      direccion: direccion,
      telefono: telefono
    });

    return res
      .status(200)
      .json({ message: "Cliente creado con exito", usuarioCliente } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}













