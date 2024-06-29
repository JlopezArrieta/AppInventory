import { RequestHandler } from "express";
import { Producto } from "../../../models/producto.model/producto.model";
import { Inventario } from "../../../models/inventario.model/inventario.model";

interface ManejoRespuesta {
  message: string;
  productoDB?: Object;
  error?: any;
}

export const desactivarProducto: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const productoDB: Producto | null = await Producto.findByPk(id);
    if (!productoDB) {
      return res
        .status(400)
        .json({ message: `El Producto con el Id: ${id} No existe ne la base de datos` } as ManejoRespuesta);
    }

    if (productoDB.estado === "ACTIVO") {
      await Producto.update({
        estado: "NO ACTIVO"
      }, {
        where: {
          id: id
        }
      });
      const inventario: Inventario | null = await Inventario.findByPk(id);
      if (!inventario) {
        return res
          .status(400)
          .json({ message: `El Inventario con el Id: ${id} No existe ne la base de datos, debes crear el inventario` } as ManejoRespuesta);
      } else {
        await Inventario.update({
          disponibilidad: "NO"
        }, {
          where: {
            productoId: id
          }
        });
      }

      return res
        .status(200)
        .json({ message: `El Producto Desactivado` } as ManejoRespuesta);

    } else {
      await Producto.update({
        estado: "ACTIVO"
      }, {
        where: {
          id: id
        }
      });
      const inventario: Inventario | null = await Inventario.findByPk(id);
      if (!inventario) {
        return res
          .status(400)
          .json({ message: `El Inventario con el Id: ${id} No existe ne la base de datos` } as ManejoRespuesta);
      } else {
        await Inventario.update({
          disponibilidad: "SI"
        }, {
          where: {
            productoId: id
          }
        });
      }

      return res
        .status(200)
        .json({ message: `El Producto Activado` } as ManejoRespuesta);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}




