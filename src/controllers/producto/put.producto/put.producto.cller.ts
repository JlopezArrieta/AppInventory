import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  productoModificado?: Producto | null;
  error?: any;
}

interface ProductoReqBody {
  nombre: string;
  marca: string;
  cantidadTotal: number;
  precioUnitario: number;
  codigo: string;
  lote: string;
}

export const modificarProducto: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const { nombre, marca, cantidadTotal, precioUnitario, codigo, lote }: ProductoReqBody = req.body;

    //Esto garantiza que si hay disponibilidad.
    let disponible: string;
    if (cantidadTotal > 0) {
      disponible = "SI"
    } else {
      disponible = "NO"
    }

    let valorTotal: number = cantidadTotal * precioUnitario;

    const [numeroFilasModificadas] = await Producto.update(
      {
        nombre: nombre,
        marca: marca,
        cantidadTotal: cantidadTotal,
        precioPorKg: precioUnitario,
        precioTotal: valorTotal,
        disponibilidad: disponible,
        codigo: codigo,
        lote: lote,
      }, {
      where: {
        id: id
      },
    },
    );

    if (numeroFilasModificadas > 0) {
      const productoModificado: Producto | null = await Producto.findByPk(id);
      return res
        .status(200)
        .json({ message: `El Producto con el Id: ${id} fue Modificado con exito`, productoModificado } as ManejoRespuesta);
    } else {
      return res
        .status(400)
        .json({ message: `El Producto con el Id: ${id} no fue Modificado, verifique el Id` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}






