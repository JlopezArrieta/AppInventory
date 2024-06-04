import { RequestHandler } from "express";
import { verificarToken } from "../../helper/jwt";

interface ManejoRespuesta {
  message: string,
  error?: any
}

export const adminMiddlewares: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    //const token = req.headers.tk;
    if (!token) {
      return res
        .status(400)
        .send({ message: "No se ha proporcionado un token" } as ManejoRespuesta);
    }

    const accesoToken = await verificarToken(token);
    if (!accesoToken) {
      return res
        .status(400)
        .json({ message: "Credenciales Incorrectas" } as ManejoRespuesta);
    }

    if (accesoToken.rol !== "Administrador") {
      next();
    } else {
      return res
        .status(400)
        .json({ message: "No tienes persmiso de administrador" } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}






