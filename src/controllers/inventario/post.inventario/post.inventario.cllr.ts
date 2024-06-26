import { RequestHandler } from "express";
import { Inventario } from "../../../models/inventario.model/inventario.model";
import { Producto } from "../../../models/producto.model/producto.model";
import moment from "moment-timezone";

interface ProductoReqBody {
  productoId: number
  cantidadTotal: number
}

interface ManejoRespuesta {
  message: string;
  error?: any;
}
//productoId, referencia, nombreProducto\, cantidadTotal\, cantidadVendidas\, cantidadDisponible\, disponibilidad\, fecha\
export const crearInventario: RequestHandler = async (req, res) => {
  try {
    const { productoId, cantidadTotal }: ProductoReqBody = req.body

    if (!productoId || !cantidadTotal) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" } as ManejoRespuesta);
    }

    const inventario: Inventario | null = await Inventario.findOne({
      where: {
        productoId: productoId
      }
    });

    if (inventario) {
      return res
        .status(400)
        .json({ message: "Este Producto ya tiene Inventario creado" } as ManejoRespuesta);
    }

    const producto: Producto | null = await Producto.findByPk(productoId);

    if (producto) {
      const fechaRegistro = moment.tz("America/Bogota").format("YYYY-MM-DD hh:mm:ss A");

      const inventario: Inventario = await Inventario.create({
        productoId: productoId,
        nombreProducto: producto?.nombre,
        referencia: producto?.codigo,
        cantidadTotal: cantidadTotal,
        cantidadVendidas: 0,
        cantidadDisponible: cantidadTotal,
        disponibilidad: "Si",
        fecha: fechaRegistro,
      });

      if (inventario.cantidadDisponible > 0) {
        await Producto.update({
          estado: "ACTIVO"
        }, {
          where: {
            id: productoId
          }
        })
      }

      return res
        .status(200)
        .json({ message: "Inventario creado con exito", inventario } as ManejoRespuesta);
    } else {
      return res
        .status(400)
        .json({ message: `El Producto con el Id: ${productoId} no existe en la base de datos` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}






