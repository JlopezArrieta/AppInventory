import { RequestHandler } from "express";
import { Compra } from "../../../models/compra.model/compra.model";
import { Carrito } from "../../../models/carrito.model/carrito.model";
import moment from "moment-timezone";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  compraCreada: Compra;
  arrayCompras: Compra[];
  error?: any;
}

interface CompraReqBody {
  usuarioId: number
}

export const crearCompra: RequestHandler = async (req, res) => {
  try {
    const { usuarioId }: CompraReqBody = req.body;

    if (!usuarioId) {
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
        .json({ message: `El Usuario con el Id: ${usuarioId} no Existe en la base de Datos` } as ManejoRespuesta);
    }

    const fecha = moment.tz("America/Bogota").format("YYYY-MM-DD hh:mm:ss A");

    let precioTotal: number = 0;
    carritos.forEach(carrito => {
      precioTotal = precioTotal + carrito.subTotal;
    });

    const compra: Compra | null = await Compra.create({
      usuarioId: usuarioId,
      fechaCompra: fecha,
      valorTotal: precioTotal
    });

    const detalles = carritos.map(carrito => ({
      producto: carrito.producto.nombre,
      cantidad: carrito.cantidad,
      precioUnitario: carrito.producto.precioUnitario,
      total: carrito.cantidad * carrito.producto.precioUnitario,
    }));

    await Factura.create({
      compraId: compra.id,
      fechaEmision: new Date(),
      detalles: JSON.stringify(detalles),
    });

    await Carrito.destroy({ where: { usuarioId } });

    res.status(201).json({ message: 'Compra realizada con éxito', compra, factura: detalles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
};

// if (productoDB.cantidadTotal < cantidadVendida) {
//   return res
//     .status(400)
//     .json({ message: "Cantidad insuficiente para la venta" } as ManejoRespuesta);
// }

// productoDB.cantidadTotal = productoDB.cantidadTotal - cantidadVendida;
// await productoDB.save();

// const valorTotal = Math.round(productoDB.precioUnitario * cantidadVendida * 100) / 100;
// const cantVend = Math.round(cantidadVendida * 100) / 100;

// const compraCreada: Compra = await Compra.create({
//   cantidad: cantVend,
//   referencia: codigoProducto,
//   nombreProducto: productoDB.nombre,
//   precioUnitario: productoDB.precioUnitario,
//   precioTotal: valorTotal,
//   usuarioId: usuarioId,
// });

// return res
//   .status(200)
//   .json({ message: "Compra Creada con Exito", compraCreada } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }

















