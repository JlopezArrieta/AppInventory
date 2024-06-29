import { RequestHandler } from "express";
import { Inventario } from "../../../models/inventario.model/inventario.model";

interface ManejoRespuesta {
  message: string;
  error?: any;
}

export const buscarInventario: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const inventario: Inventario | null = await Inventario.findByPk(id);

    if (!inventario) {
      return res
        .status(400)
        .json({ message: "El Inventario no existe en la base de datos" } as ManejoRespuesta);
    }
    return res
      .status(200)
      .json({ message: "Lista de inventario", inventario } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}





