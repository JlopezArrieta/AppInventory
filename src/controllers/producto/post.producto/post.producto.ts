import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ProductoReqBody {
  nombre: string;
  cantidad: number;
  precio: number;
  marca: string;
  codigo: string;
  lote: string;
  fecha: Date;
}

interface ManejoRespuesta {
  message: string;
  productoCreado?: Producto;
  error?: any;
}

export const crearProducto: RequestHandler = async (req, res) => {
  try {
    const { nombre, cantidad, precio, marca, codigo, lote, fecha }: ProductoReqBody = req.body;

    if (!nombre || !cantidad || !precio || !marca || !codigo || !lote || !fecha) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const productoDB: Producto | null = await Producto.findOne({
      where: {
        lote: lote
      }
    });

    if (productoDB) {
      return res
        .status(403)
        .json({ message: "Este producto ya existe en la base de datos" });
    }

    //Esto garantiza que si haya disponibilidad.
    let disponible: string;
    if (cantidad > 0) {
      disponible = "SI"
    } else {
      disponible = "NO"
    }

    //Otra forma.
    //const disponible = cantidad > 0 ? "SI" : "NO";

    const productoCreado: Producto = await Producto.create({
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
      marca: marca,
      codigo: codigo,
      estado: "Activo",
      disponibilidad: disponible,
      lote: lote,
      fecha: fecha
    });
    return res
      .status(200)
      .json({ message: "Producto creado con exito", productoCreado } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}