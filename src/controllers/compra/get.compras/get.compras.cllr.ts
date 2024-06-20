// import { RequestHandler } from "express";
// import { Compra } from "../../../models/compra.model/compra.model";

// interface ManejoRespuesta {
//   message: string;
//   compras: Compra[];
//   error?: any;
// }

// export const buscarCompras: RequestHandler = async (req, res) => {
//   try {
//     const compras: Compra[] = await Compra.findAll();
//     return res
//       .status(200)
//       .json({ message: "Lista de Compras", compras } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }










