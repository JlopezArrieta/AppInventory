import { RequestHandler } from "express";
import { Compra } from "../../../models/compra.model/compra.model";

interface ManejoRespuesta {
  message: string;
  compraEliminada?: number;
  error?: any;
}

export const desactivarCompra: RequestHandler = async (req, res) => {
  try {
    const compraId = req.params.compraId;

    const compra: Compra | null = await Compra.findByPk(compraId);

    if (!compra) {
      return res
        .status(400)
        .json({ message: `La compra con el Id: ${compraId} no existe en la base de datos` } as ManejoRespuesta);
    }

    if (compra.estado === "Activa" && compra.factura.estado === "Activa") {
      compra.estado = "Cancelada";
      compra.factura.estado = "Cancelada";
      compra.save();
      return res
        .status(200)
        .json({ message: `Compra y Factura desactivada` } as ManejoRespuesta);
    } else {
      compra.estado = "Cancelada";
      compra.factura.estado = "Cancelada";
      compra.save();
      return res
        .status(200)
        .json({ message: `Compra y Factura Activada` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}













