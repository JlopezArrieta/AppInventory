// import { RequestHandler } from "express";
// import { FacturaVenta } from "../../../models/factura.model/factura.model";

// interface ManejoRespuesta {
//   message: string;
//   facturas: FacturaVenta[];
//   error?: any;
// }

// export const buscarFacturaVentas: RequestHandler = async (req, res) => {
//   try {
//     const facturas: FacturaVenta[] = await FacturaVenta.findAll();
//     if (!facturas) {
//       return res
//         .status(400)
//         .json({ message: "Noy facturas creadas en la base de datos" } as ManejoRespuesta);
//     }
//     return res
//       .status(200)
//       .json({ message: "Lista de Facturas de Compras", facturas } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }


















