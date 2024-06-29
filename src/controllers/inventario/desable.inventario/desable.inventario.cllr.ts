import { RequestHandler } from "express";
import { Inventario } from "../../../models/inventario.model/inventario.model";
import { Producto } from "../../../models/producto.model/producto.model";

interface ManejoRespuesta {
  message: string;
  error: any;
}

export const desableInventario: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;

    const inventarioDB: Inventario | null = await Inventario.findByPk(id);
    if (!inventarioDB) {
      return res
        .status(400)
        .json({ message: `EL Inventario con el Id: ${id} no existe en la base de datos` } as ManejoRespuesta);
    }

    if (inventarioDB.disponibilidad === "SI") {
      await Inventario.update({
        disponibilidad: "NO"
      }, {
        where: {
          id: id
        }
      });

      //llamado de Producto para actualizar el estado
      const producto: Producto | null = await Producto.findByPk(inventarioDB.productoId);
      if (!producto) {
        return res
          .status(400)
          .json({ message: `El Producto con el Id: ${id} no existe en la base de datos` } as ManejoRespuesta);
      } else {
        await Producto.update({
          estado: "NO ACTIVO"
        }, {
          where: {
            id: inventarioDB.productoId
          }
        });
      }

      return res
        .status(200)
        .json({ message: "Inventario Desactivado" } as ManejoRespuesta);

    } else {
      await Inventario.update({
        disponibilidad: "SI"
      }, {
        where: {
          id: id
        }
      });

      //llamado de Producto para actualizar el estado
      const producto: Producto | null = await Producto.findByPk(inventarioDB.productoId);
      if (!producto) {
        return res
          .status(400)
          .json({ message: `El Producto con el Id: ${id} no existe en la base de datos` } as ManejoRespuesta);
      } else {
        await Producto.update({
          estado: "ACTIVO"
        }, {
          where: {
            id: inventarioDB.productoId
          }
        });
      }

      return res
        .status(200)
        .json({ message: "Inventario Activado" } as ManejoRespuesta);
    }

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}










