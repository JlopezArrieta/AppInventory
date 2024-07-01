import { RequestHandler } from "express";
import { Factura } from "../../../models/factura.model/factura.model";
import { Compra } from "../../../models/compra.model/compra.model";
import { Detalle } from "../../../models/detalle.model/detalle.model";
import { Inventario } from "../../../models/inventario.model/inventario.model";


interface ManejoRespuesta {//
  message: string;
  error?: any;
}

export const desactivarFactura: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;

    const factura: Factura | null = await Factura.findByPk(id);
    if (!factura) {
      return res
        .status(400)
        .json({ message: `La factura con el Id: ${id} no existe en la base de datos` } as ManejoRespuesta);
    }

    const compra: Compra | null = await Compra.findByPk(factura.compraId);
    if (!compra) {
      return res
        .status(400)
        .json({ message: `La compra con el Id: ${id} no existe en la base de datos` } as ManejoRespuesta);
    }

    let detalles: Detalle[] = await Detalle.findAll({
      where: {
        facturaId: factura.id
      }
    });

    if (!detalles) {
      return res
        .status(400)
        .json({ message: `No hay detalles en la base de datos con ese Id: ${factura.id}` } as ManejoRespuesta);
    }

    if (factura.estado === "Activa" && compra.estado === "Activa") {
      factura.estado = "Cancelada";
      compra.estado = "Cancelada";
      await factura.save();
      await compra.save();

      for (const detalle of detalles) {
        const inventario = await Inventario.findByPk(detalle.inventarioId);
        if (inventario) {
          inventario.cantidadVendidas = inventario.cantidadVendidas - detalle.cantidad;
          inventario.cantidadDisponible = inventario.cantidadDisponible + detalle.cantidad;
          inventario.disponibilidad = inventario.cantidadDisponible > 0 ? "Si" : "No";
          await inventario.save();
        }
      }

      return res
        .status(200)
        .json({ message: `Compra y Factura desactivada` } as ManejoRespuesta);
    } else {
      factura.estado = "Activa";
      compra.estado = "Activa";
      await factura.save();
      await compra.save();

      for (const detalle of detalles) {
        const inventario = await Inventario.findByPk(detalle.inventarioId);
        if (inventario) {
          inventario.cantidadVendidas = inventario.cantidadVendidas + detalle.cantidad;
          inventario.cantidadDisponible = inventario.cantidadDisponible - detalle.cantidad;
          inventario.disponibilidad = inventario.cantidadDisponible > 0 ? "Si" : "No";
          await inventario.save();
        }
      }

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

