import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";
import { Op } from "sequelize";

interface ProductoReqBody {
  nombre: string;
  cantidadTotal: number;
  precioPorKg: number;
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
    const { nombre, cantidadTotal, precioPorKg, marca, codigo, lote, fecha }: ProductoReqBody = req.body;

    if (!nombre || !precioPorKg || !marca || !codigo || !lote || !fecha) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const productoDB: Producto | null = await Producto.findOne({
      where: {
        [Op.or]: [
          { lote: lote },
          { codigo: codigo }
        ]
      }
    });

    if (productoDB) {
      return res
        .status(403)
        .json({ message: "Este producto ya existe en la base de datos" });
    }

    //Esto garantiza que si haya disponibilidad.
    let disponible: string;
    if (cantidadTotal > 0) {
      disponible = "SI"
    } else {
      disponible = "NO"
    }

    //Otra forma.
    //const disponibilidad = cantidad > 0 ? "SI" : "NO";

    const valorTotal: number = cantidadTotal * precioPorKg;

    const productoCreado: Producto = await Producto.create({
      nombre: nombre,
      cantidadTotal: cantidadTotal,
      precioPorKg: precioPorKg,
      precioTotal: valorTotal,
      marca: marca,
      codigo: codigo,
      estado: "Activo",
      disponibilidad: disponible,
      lote: lote,
      fecha: fecha
    });
    return res
      .status(200)
      .json({ message: "Producto creado con exito", ProductoCreado: productoCreado } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}



