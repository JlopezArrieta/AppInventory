import { RequestHandler } from "express";
import { Carrito } from "../../../models/carrito.model/carrito.model";

interface ManejoRespuesta {
  message: string;
  carrito: Carrito | null;
  error?: any;
}

export const eliminarCarrito: RequestHandler = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const carrito: Object | null = await Carrito.destroy({
      where: {
        usuarioId: usuarioId
      }
    });
    if (carrito) {
      return res
        .status(200)
        .json({ message: "Carrito Eliminado con Exito", carrito } as ManejoRespuesta);
    } else {
      return res
        .status(400)
        .json({ message: `El Carrito con el UsuarioId: ${usuarioId} no Existe en la base de datos` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}























