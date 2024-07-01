import { RequestHandler } from "express";
import { Carrito } from "../../../models/carrito.model/carrito.model";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {//
  message: string;
  carritos: Carrito[];
  error?: any;
}

export const buscarCarrito: RequestHandler = async (req, res) => {
  try {
    const usuarioid: string = req.params.usuarioId;

    const carritos: Carrito[] = await Carrito.findAll({
      where: {
        usuarioId: usuarioid
      },
      include: [{
        model: Producto,
        attributes: {
          exclude: ["id", "marca", "cantidadTotal", "precioTotal", "codigo", "disponibilidad", "lote", "fechaRegistro"]
        }
      }]

    });
    if (carritos.length !== 0) {
      return res
        .status(200)
        .json({ message: "Lista de Carritos", carritos } as ManejoRespuesta);
    } else {
      return res
        .status(400)
        .json({ message: `El Usuario con el Id: ${usuarioid} no tiene carrito creado` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}










