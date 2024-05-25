import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  productoModificado?: Producto | null;
  error?: any;
}

interface ProductoReqBody {
  nombre: string;
  cantidad: number;
  precioPorKg: number;
  precioTotal: number;
  marca: string;
  codigo: string;
  lote: string;
  fecha: Date;
}

export const modificarProducto: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const { nombre, cantidad, precioPorKg, marca, codigo, lote, fecha }: ProductoReqBody = req.body;

    //Esto garantiza que si haya disponibilidad.
    let disponible: string;
    if (cantidad > 0) {
      disponible = "SI"
    } else {
      disponible = "NO"
    }

    const valorTotal: number = cantidad * precioPorKg;

    const [numeroFilasModificadas] = await Producto.update(
      {
        nombre: nombre,
        cantidadTotal: cantidad,
        precioPorKg: precioPorKg,
        precioTotal: valorTotal,
        marca: marca,
        codigo: codigo,
        disponibilidad: disponible,
        lote: lote,
        fecha: fecha
      }, {
      where: {
        id: id
      },
    },
    );

    if (numeroFilasModificadas > 0) {
      console.log(numeroFilasModificadas);
      const productoModificado: Producto | null = await Producto.findByPk(id);
      return res
        .status(200)
        .json({ message: "El Producto con el Id fue Modificado con exito", productoModificado } as ManejoRespuesta);
    } else {
      console.log(numeroFilasModificadas);
      return res
        .status(400)
        .json({ message: "El Producto con el Id no fue Modificado o no existe en la base de datos" } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}






