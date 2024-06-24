import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";
import { Op } from "sequelize";
import moment from "moment-timezone";

interface ProductoReqBody {
  nombre: string;
  marca: string;
  precioUnitario: number;
  codigo: string;
  lote: string
}

interface ManejoRespuesta {
  message: string;
  productoCreado?: Producto;
  error?: any;
}

export const crearProducto: RequestHandler = async (req, res) => {
  try {
    const { nombre, marca, precioUnitario, codigo, lote }: ProductoReqBody = req.body;

    if (!nombre || !marca || !precioUnitario || !codigo || !lote) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" } as ManejoRespuesta);
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
    // let disponible: string;
    // if (cantidadTotal > 0) {
    //   disponible = "SI"
    // } else {
    //   disponible = "NO"
    // }

    //Otra forma.
    //const disponibilidad = cantidad > 0 ? "SI" : "NO";

    const fecha = moment.tz("America/Bogota").format("YYYY-MM-DD hh:mm:ss A");

    const productoCreado: Producto = await Producto.create({
      nombre: nombre,
      marca: marca,
      precioUnitario: precioUnitario,
      codigo: codigo,
      disponibilidad: "Si",
      lote: lote,
      fechaRegistro: fecha
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



