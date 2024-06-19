import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  productoDB?: Producto | null;
  error?: any;
}

export const buscarProducto: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const productoDB: Producto | null = await Producto.findByPk(id);
    if (productoDB) {
      return res
        .status(200)
        .json({ message: `El Producto con el Id: ${id} Es: `, productoDB } as ManejoRespuesta);
    } else {
      return res
        .status(400)
        .json({ message: `El Producto con el Id: ${id} no existe en la base de datos` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}






