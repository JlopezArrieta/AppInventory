import { RequestHandler } from "express";
import { Inventario } from "../../../models/inventario.model/inventario.model";

interface ManejoRespuesta {
  message: string;
  error?: any;
}

export const buscarInventarios: RequestHandler = async (req, res) => {
  try {
    const inventario: Inventario[] = await Inventario.findAll();

    if (!inventario) {
      return res
        .status(400)
        .json({ message: "No Hay Lista de inventarios" } as ManejoRespuesta);
    }
    return res
      .status(200)
      .json({ message: "Lista de inventarios", inventario } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}











