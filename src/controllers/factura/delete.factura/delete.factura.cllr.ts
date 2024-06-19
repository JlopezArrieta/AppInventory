// import { RequestHandler } from "express";
// import { Factura } from "../../../models/factura.model/factura.model";


// interface ManejoRespuesta {
//   message: string;
//   factura: number | string;
//   error: any;
// }

// export const eliminarFacturaVenta: RequestHandler = async (req, res) => {
//   try {
//     const id: string = req.params.id;
//     const factura: number | string = await Factura.destroy({
//       where: {
//         id: id
//       }
//     });

//     if (factura === 0) {
//       return res
//         .status(400)
//         .json({ message: `La factura con el id: ${id} no existe en la base de datos` } as ManejoRespuesta);
//     }

//     return res
//       .status(200)
//       .json({ message: "Factura Eliminada con Éxito", factura } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }















