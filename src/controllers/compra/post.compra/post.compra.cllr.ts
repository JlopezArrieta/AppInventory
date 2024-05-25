import { RequestHandler } from "express";
import { Compra } from "../../../models/compra.model/compra.model";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  compraCreada: Compra;
  arrayCompras: Compra[];
  error?: any;
}

interface ProductoReqBody {
  codigoProducto: string;
  cantidadVendida: number;
}

export const crearCompra: RequestHandler = async (req, res) => {
  try {
    const { codigoProducto, cantidadVendida }: ProductoReqBody = req.body;

    if (!codigoProducto || cantidadVendida === 0) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar al menos un producto con cantidad" } as ManejoRespuesta);
    }

    const productoDB: Producto | null = await Producto.findOne({
      where: {
        codigo: codigoProducto
      }
    });

    if (!productoDB) {
      return res
        .status(400)
        .json({ message: "El Producto no Existe" } as ManejoRespuesta);
    }

    if (productoDB.cantidadTotal < cantidadVendida) {
      console.log(`Cantidad insuficiente para el producto con código ${codigoProducto}`);
      return res
        .status(400)
        .json({ message: "Cantidad insuficiente para la venta" } as ManejoRespuesta);
    }

    productoDB.cantidadTotal = productoDB.cantidadTotal - cantidadVendida;
    await productoDB.save();

    const valorTotal: number = productoDB.precioPorKg * cantidadVendida;

    const compraCreada: Compra = await Compra.create({
      cantidad: cantidadVendida,
      referencia: codigoProducto,
      nombreProducto: productoDB.nombre,
      precioPorKg: productoDB.precioPorKg,
      precioTotal: valorTotal,
    });

    return res
      .status(200)
      .json({ message: "Compra Creada con Exito", compraCreada } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}

















