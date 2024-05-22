import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";
import { FacturaVenta } from "../../../models/facturaVenta.model/facturaVenta.model";

interface ProductoReqBody {
  cantidadVendida?: number;
  productos?: Producto[];
}

interface ManejoRespuesta {
  message: string;
  arrayFacturas?: FacturaVenta[];
  valorAPagar?: number;
  FechaDeCompra?: Date;
  fecha?: Date;
  estado?: string;
  EstadoDeFactura?: string;
  error?: any;
}

export const crearFacturaVenta: RequestHandler = async (req, res) => {
  try {
    const { cantidadVendida, productos }: ProductoReqBody = req.body;

    if (!cantidadVendida || !productos) {
      return res
        .status(400)
        .json({ message: "Todos los campos son Obligatorio" });
    }

    if (productos.length === 0) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar al menos un producto" });
    }

    const arrayFacturas: FacturaVenta[] = [];
    let valorTotal: number = 0;
    let valorAPagar: number = 0;
    let fecha;
    let estado;

    for (const producto of productos) {
      const productoDB = await Producto.findOne({
        where: {
          codigo: producto
        }
      });

      if (!productoDB) {
        return res
          .status(400)
          .json({ message: "El Producto no existe" } as ManejoRespuesta);
      }

      if (productoDB.cantidadTotal < cantidadVendida) {
        return res
          .status(400)
          .json({ message: "Cantidad insuficiente para la venta" } as ManejoRespuesta);
      }

      productoDB.cantidadTotal = productoDB.cantidadTotal - cantidadVendida;
      await productoDB.save();

      valorTotal = productoDB.precioPorKg * cantidadVendida;

      const productoVendido: FacturaVenta = await FacturaVenta.create({
        nombreProducto: productoDB.nombre,
        cantidad: cantidadVendida,
        precioPorKg: productoDB.precioPorKg,
        precioTotal: valorTotal,
      });
      fecha = new Date();
      estado = "Activo";
      arrayFacturas.push(productoVendido);
      valorAPagar = valorAPagar + valorTotal;
    }
    return res
      .status(200)
      .json({ message: "Compra Exitosa", FechaDeCompra: fecha, EstadoDeFactura: estado, FacturaDevebta: arrayFacturas, ValorApagar: valorAPagar } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}











