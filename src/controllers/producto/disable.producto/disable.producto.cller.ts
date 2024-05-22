import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  producto?: Producto | null;
  error?: any;
}

export const cambioEstadoProducto: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const productoDB: Producto | null = await Producto.findByPk(id);

    if (!productoDB) {
      return res
        .status(400)
        .json({ message: "El Producto con el Id No existe ne la base de datos" } as ManejoRespuesta);
    }

    if (productoDB.estado === "Activo") {
      const producto: Object = await Producto.update(
        {
          estado: "No Activo"
        }, {
        where: {
          id: id
        }
      }
      );
      return res
        .status(200)
        .json({ message: "Producto Desactivado", producto } as ManejoRespuesta);
    } else {
      const producto: Object = await Producto.update(
        {
          estado: "Activo"
        }, {
        where: {
          id: id
        }
      }
      );
      return res
        .status(200)
        .json({ message: "Producto Activado", producto } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}




