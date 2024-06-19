// import { RequestHandler } from "express";
//import { FacturaVenta } from "../../../models/factura.model/factura.model";

// interface ManejoRespuesta {
//   message: string;
//   factura: FacturaVenta | null;
//   error: any;
// }

// export const buscarIdFacturaVenta: RequestHandler = async (req, res) => {
//   try {
//     const id: string = req.params.id;
//     const factura: FacturaVenta | null = await FacturaVenta.findByPk(id);

//     if (!factura) {
//       return res
//         .status(200)
//         .json({ message: `La factura con el id: ${id} no existe en la base de datos` } as ManejoRespuesta);
//     }

//     return res
//       .status(200)
//       .json({ message: "Factura de Compra Es: ", factura } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }














