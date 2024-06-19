import { RequestHandler } from "express";
import { Usuario } from "../../../models/usuario.model/usuario.model";
import { hashPassword } from "../../../helper/handle.bcrypt";
import { Op } from "sequelize";
import { verificarToken } from "../../../helper/jwt";
import moment from "moment-timezone";

interface ManejoRespuesta {
  message: string,
  crearUsuario: Usuario,
  error: any,
};

interface ProductoReqBody {
  nombresApellidos: string;
  numDocumento: number;
  direccion: string;
  telefono: number;
  correo: string;
  contrasena: string;
  rol: string;
}

export const crearUsuario: RequestHandler = async (req, res) => {
  try {
    const { nombresApellidos, numDocumento, direccion, telefono, correo, contrasena, rol }: ProductoReqBody = req.body;

    if (!nombresApellidos || !numDocumento || !direccion || !telefono) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    if (correo) {
      const usuario: Usuario | null = await Usuario.findOne({
        where: {
          [Op.or]: [
            { numDocumento: numDocumento },
            { correo: correo }
          ]
        }
      });
      if (usuario) {
        return res
          .status(403)
          .json({ message: "Este Usuario ya existe en la base de datos" } as ManejoRespuesta);
      }
    } else {
      const usuario: Usuario | null = await Usuario.findOne({
        where: {
          numDocumento: numDocumento
        },
      });
      if (usuario) {
        return res
          .status(403)
          .json({ message: "Este Usuario ya existe en la base de datos" } as ManejoRespuesta);
      }
    }

    let contrasenaIncriptada: string = "";
    if (contrasena !== "") {
      contrasenaIncriptada = await hashPassword(contrasena);
    }

    let rolAsignado: string = "Admin";
    const token: any = req.headers.token;

    if (token) {
      const accesoToken = await verificarToken(token);
      if (accesoToken.rol === "Admin") {
        rolAsignado = rol;
      }

      if (accesoToken.rol === "Empleado") {
        rolAsignado = "Cliente";
      }
    }

    const fechaDeCompra = moment.tz("America/Bogota").format("YYYY-MM-DD hh:mm:ss A");

    const crearUsuario: Usuario = await Usuario.create({
      nombresApellidos: nombresApellidos,
      tipoDocumento: "CC",
      numDocumento: numDocumento,
      direccion: direccion,
      telefono: telefono,
      correo: correo,
      contrasena: contrasenaIncriptada,
      rol: rolAsignado,
      fechaRegistro: fechaDeCompra,
    });
    return res
      .status(200)
      .json({ message: `Usuario ${rolAsignado} creado con exito`, crearUsuario } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}
















