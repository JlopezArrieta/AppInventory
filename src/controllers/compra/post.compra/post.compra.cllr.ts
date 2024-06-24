import { RequestHandler } from "express";
import { Compra } from "../../../models/compra.model/compra.model";
import { Carrito } from "../../../models/carrito.model/carrito.model";
import { Producto } from "../../../models/producto.model/producto.model";
import { Factura } from "../../../models/factura.model/factura.model";
import moment from "moment-timezone";
import { Detalle } from "../../../models/detalle.model/detalle.model";

interface ManejoRespuesta {
  message: string;
  compra: Compra | null;
  detalles: Detalle[] | null;
  factura: Object | null;
  error?: any;
}

interface CompraReqBody {
  metodoDePago: string,
  usuarioId: number,
}

export const crearCompra: RequestHandler = async (req, res) => {
  try {
    const { metodoDePago, usuarioId }: CompraReqBody = req.body;

    if (!metodoDePago || !usuarioId) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorio" } as ManejoRespuesta);
    }

    const carritos: Carrito[] = await Carrito.findAll({
      where: {
        usuarioId: usuarioId
      },
      include: [Producto]
    });

    if (!carritos.length) {
      return res
        .status(400)
        .json({ message: `Carrito vacio, verifique el Id: ${usuarioId} del usuario` } as ManejoRespuesta);
    }

    const fecha = moment.tz("America/Bogota").format("YYYY-MM-DD hh:mm:ss A");

    let precioTotal: number = 0;
    for (const carrito of carritos) {
      precioTotal = precioTotal + carrito.subTotal;
    };

    const compra: Compra | null = await Compra.create({
      fechaCompra: fecha,
      valorTotal: precioTotal,
      metodoDePago: metodoDePago,
      estado: "Activa"
    });

    const factura: Factura | null = await Factura.create({
      usuarioId: usuarioId,
      compraId: compra.id,
      fechaEmision: fecha,
      estado: "Activa"
    })

    const detalles: Detalle[] | null = [];

    for (const carrito of carritos) {
      const detalle: Detalle | null = await Detalle.create({
        facturaId: factura.id,
        cantidad: carrito.cantidad,
        producto: carrito.producto.nombre,
        precioUnitario: carrito.producto.precioUnitario,
        valorTotal: carrito.subTotal
      });
      detalles.push(detalle);
    }

    await Carrito.destroy({
      where: {
        usuarioId
      }
    });

    return res
      .status(200)
      .json({ message: 'Compra realizada con éxito', compra, factura, detalles } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
};



















