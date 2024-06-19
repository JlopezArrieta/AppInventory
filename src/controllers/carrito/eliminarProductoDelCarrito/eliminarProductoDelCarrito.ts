import { RequestHandler } from "express";
import { Carrito } from "../../../models/carrito.model/carrito.model";

interface ManejoRespuesta {
  message: string;
  carrito: Carrito | null;
  error?: any;
}

export const eliminarProductoDelCarrito: RequestHandler = async (req, res) => {
  try {
    const { usuarioId, productoId } = req.params;
    const carrito: Carrito | null = await Carrito.findOne({
      where: {
        usuarioId: usuarioId,
        productoId: productoId
      }
    });
    if (carrito) {
      await carrito.destroy();
      return res
        .status(200)
        .json({ message: "Producto Eliminado del Carrito", carrito } as ManejoRespuesta);
    } else {
      return res
        .status(400)
        .json({ message: "El Carrito no Existe en la base de datos" } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}











