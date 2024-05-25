import { RequestHandler } from "express";
import { FacturaVenta } from "../../../models/facturaVenta.model/facturaVenta.model";
import { Compra } from "../../../models/compra.model/compra.model";

interface ManejoRespuesta {
  message: string;
  facturaDeVenta: FacturaVenta | null;
  facturaDeCompras: FacturaVenta | null;
  error?: any;
}
export const crearFacturaVenta: RequestHandler = async (req, res) => {
  try {
    const compras: Compra[] = await Compra.findAll();
    if (compras.length === 0) {
      return res.status(400).json({ message: "Noy compras seleccionadas" } as ManejoRespuesta);
    }

    let valorTotal: number = 0;
    compras.forEach(compra => {
      valorTotal = valorTotal + compra.precioTotal;
    });

    const fecha = new Date();
    const fechaActual = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

    const crearFactura: FacturaVenta = await FacturaVenta.create({
      fechaDeCompra: fechaActual,
      estadoDeFactura: "Activa",
      valorApagar: valorTotal
    });

    for (const compra of compras) {
      await crearFactura.$add('Compras', compra);
    }

    const facturaDeCompras: FacturaVenta | null = await FacturaVenta.findByPk(crearFactura.id, {
      include: [Compra]
    });

    await Compra.destroy({ where: {} });

    return res
      .status(200)
      .json({ message: "Factura de Venta creada con Exito", facturaDeVenta: facturaDeCompras } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}























