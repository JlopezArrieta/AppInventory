import { RequestHandler } from "express";
import { Compra } from "../../models/compra.model/compra.model";
import { Factura } from "../../models/factura.model/factura.model";
import { Detalle } from "../../models/detalle.model/detalle.model";


interface ManejoRespuesta {
  message: string;
  compra: Compra | null;
  factura: Factura | null;
  detalles: Detalle[] | null;
  error?: any;
}

export const buscarFactura: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const factura: Factura | null = await Factura.findByPk(id);
    const compra: Compra | null = await Compra.findByPk(factura?.compraId);
    const detalles: Detalle[] | null = await Detalle.findAll({
      where: {
        facturaId: factura?.id
      }
    });

    if (!compra || !factura || detalles.length === 0) {
      return res
        .status(400)
        .json({ message: `La Compra con el id: ${id} no existe en la base de datos` } as ManejoRespuesta);
    }

    return res
      .status(200)
      .json({ message: "Lista de Compra", compra, factura, detalles } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}
