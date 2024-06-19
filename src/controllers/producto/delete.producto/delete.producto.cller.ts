import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  productoDB?: Object;
  error?: any;
}

export const eliminarProducto: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const productoDB: Object = await Producto.destroy({
      where: {
        id: id
      }
    });

    if (!productoDB) {
      return res
        .status(400)
        .json({ message: `El Producto con el Id: ${id} No existe ne la base de datos` } as ManejoRespuesta);
    } else {
      return res
        .status(200)
        .json({ message: `El Producto con el Id: ${id} fue eliminado con exito` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}




