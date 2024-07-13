import { RequestHandler } from "express";
import { Usuario } from "../../models/usuario.model/usuario.model";
import { Factura } from "../../models/factura.model/factura.model";
import { Compra } from "../../models/compra.model/compra.model";

interface ManejoRespuesta {
  message: string;
  error?: any;
}

export const buscarVentasPorEmpleados: RequestHandler = async (req, res) => {
  try {
    const idEmpleado: string = req.params.empleadoId;
    const empleado: Usuario | null = await Usuario.findByPk(idEmpleado);
    if (!empleado) {
      return res
        .status(400)
        .json({
          message: `El Empleado con el Id: ${idEmpleado} no existe en la base de datos`
        } as ManejoRespuesta);
    }

    const facturas: Factura[] = await Factura.findAll({
      where: {
        empleadoId: idEmpleado
      },
      include: [{
        model: Compra,
        attributes: ['valorTotal']
      }]
    })

    if (facturas.length === 0) {
      return res
        .status(400)
        .json({ message: `El empleado con el Id: ${idEmpleado} no tiene ventas registradas` } as ManejoRespuesta);
    }

    let valorTotalCompras: number = 0;
    facturas.forEach(factura => {
      if (factura.compra) {
        valorTotalCompras = valorTotalCompras + factura.compra.valorTotal;
      }
    });

    return res
      .status(200)
      .json({ message: `Ventas del empleado ${idEmpleado}`, valorTotalCompras, facturas } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}






