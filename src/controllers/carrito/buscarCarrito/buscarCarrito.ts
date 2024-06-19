import { RequestHandler } from "express";
import { Carrito } from "../../../models/carrito.model/carrito.model";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  carritos: Carrito[];
  error?: any;
}

export const buscarCarrito: RequestHandler = async (req, res) => {
  try {
    const usuarioid: number = req.body.usuarioId;
    const carritos: Carrito[] = await Carrito.findAll({
      where: {
        usuarioId: usuarioid
      },
      include: [Producto]
    });
    return res
      .status(200)
      .json({ message: "Lista de Carritos", carritos } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}










