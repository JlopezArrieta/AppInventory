import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
    message: string;
    productoModificado?: Object;
    error?: any;
}

interface ProductoReqBody {
    nombre: string;
    cantidad: number;
    precio: number;
    marca: string;
    codigo: string;
    lote: string;
    fecha: Date;
}

export const modificarProducto: RequestHandler = async (req, res) => {
    try {
        const id: string = req.params.id;
        const { nombre, cantidad, precio, marca, codigo, lote, fecha }: ProductoReqBody = req.body;
        const productoModificado: Object = await Producto.update(
            {
                nombre: nombre,
                cantidad: cantidad,
                precio: precio,
                marca: marca,
                codigo: codigo,
                lote: lote,
                fecha: fecha
            }, {
            where: {
                id: id
            }
        }
        );
        return res
            .status(200)
            .json({ message: "El Producto con el Id fue Modificado con exito: ", productoModificado } as ManejoRespuesta);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
    }
}






