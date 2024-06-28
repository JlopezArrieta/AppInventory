import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";
import { Op } from "sequelize";

interface ManejoRespuesta {
  message: string;
  productoModificado?: Producto | null;
  error?: any;
}

interface ProductoReqBody {
  nombre: string;
  marca: string;
  precioUnitario: number;
  codigo: string;
  lote: string;
}

export const actualizarProducto: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;

    const { nombre, marca, precioUnitario, codigo, lote }: ProductoReqBody = req.body;

    const productoDB = await Producto.findOne({
      where: {
        [Op.or]: [{ codigo }, { lote }],
        id: { [Op.ne]: id }
      }
    });

    if (productoDB) {
      return res
        .status(403)
        .json({ message: `El código o lote ya existe en la base de datos con otro Id` } as ManejoRespuesta);
    }

    const [numeroFilasModificadas] = await Producto.update(
      {
        nombre: nombre,
        marca: marca,
        precioUnitario: precioUnitario,
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






