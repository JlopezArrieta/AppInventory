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

export const actualizarInventario: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const { productoId, cantidadTotal }: ProductoReqBody = req.body

    if (!productoId || !cantidadTotal) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" } as ManejoRespuesta);
    }

    const inventario: Inventario | null = await Inventario.findByPk(id);

    if (!inventario) {
      return res
        .status(400)
        .json({ message: "El Inventario no existe en la base de datos" } as ManejoRespuesta);
    }

    const producto: Producto | null = await Producto.findByPk(productoId);

    if (producto) {
      const fechaRegistro = moment.tz("America/Bogota").format("YYYY-MM-DD hh:mm:ss A");

      await Inventario.update({
        productoId: productoId,
        nombreProducto: producto?.nombre,
        referencia: producto?.codigo,
        cantidadTotal: cantidadTotal,
        cantidadVendidas: 0,
        cantidadDisponible: cantidadTotal,
        disponibilidad: "Si",
        fecha: fechaRegistro,
      },
        {
          where: {
            id: id
          }
        });
      const inventarioDB: Inventario | null = await Inventario.findByPk(id);
      return res
        .status(200)
        .json({ message: "Inventario actualizado con exito", inventarioDB } as ManejoRespuesta);
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






