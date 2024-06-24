import { RequestHandler } from "express";
import { Compra } from "../../../models/compra.model/compra.model";
import { Detalle } from "../../../models/detalle.model/detalle.model";
import { Factura } from "../../../models/factura.model/factura.model";

interface ManejoRespuesta {
  message: string;
  compras: Compra[];
  error?: any;
}

export const buscarCompras: RequestHandler = async (req, res) => {
  try {
    const compras: Compra[] = await Compra.findAll({
      include: [
        {
          model: Factura,
          include: [Detalle]
        }
      ]
    });
    if (compras.length === 0) {
      return res
        .status(400)
        .json({ message: "Lista de Compras Vacia" } as ManejoRespuesta);
    }
    return res
      .status(200)
      .json({ message: "Lista de Compras", compras } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}










