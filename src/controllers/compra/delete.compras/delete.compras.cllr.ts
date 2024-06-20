// import { RequestHandler } from "express";
// import { Compra } from "../../../models/compra.model/compra.model";

// interface ManejoRespuesta {
//   message: string;
//   compraEliminada?: number;
//   error?: any;
// }

// export const eliminarCompra: RequestHandler = async (req, res) => {
//   try {
//     const id: string = req.params.id;
//     const compraEliminada: number = await Compra.destroy({
//       where: {
//         id: id
//       }
//     });

//     if (compraEliminada === 0) {
//       return res
//         .status(400)
//         .json({ message: `La Compra con el id: ${id} no Existe` } as ManejoRespuesta);
//     }
//     return res
//       .status(200)
//       .json({ message: "Compra Eiminada con Exito", compraEliminada } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }













