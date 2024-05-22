import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
    message: string;
    productos?: Producto[];
    error?: any;
}

export const buscarProductos: RequestHandler = async (req, res) => {
    try {
        const productos: Producto[] = await Producto.findAll();
        return res
            .status(200)
            .json({ message: "Lista de Productos", productos } as ManejoRespuesta);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
    }
}






