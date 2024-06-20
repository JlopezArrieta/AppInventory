// import { RequestHandler } from "express";
// import { Compra } from "../../../models/compra.model/compra.model";

// interface ManejoRespuesta {
//   message: string;
//   compra: Compra | null;
//   error?: any;
// }

// export const buscarCompra: RequestHandler = async (req, res) => {
//   try {
//     const id: string = req.params.id;
//     const compra: Compra | null = await Compra.findByPk(id);

//     if (!compra) {
//       return res
//         .status(400)
//         .json({ message: `El producto con el id: ${id} no Existe` } as ManejoRespuesta);
//     }
//     return res
//       .status(200)
//       .json({ message: "Lista de Compras", compra } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }















