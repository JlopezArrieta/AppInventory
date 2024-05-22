// import { RequestHandler } from "express";
// import { Producto } from "../../../models/producto.model/producto.model";

// interface ManejoRespuesta {
//   message: string;
//   productoDB?: Producto | null,
//   error?: any;
// }

// interface ProductoReqBody {
//   cantidadVendida: number;
// }

// export const ventaProducto: RequestHandler = async (req, res) => {
//   try {
//     const codigo: string = req.params.codigo;
//     const { cantidadVendida }: ProductoReqBody = req.body;

//     const productoDB: Producto | null = await Producto.findOne({
//       where: {
//         codigo: codigo
//       }
//     });

//     if (!productoDB) {
//       return res
//         .status(400)
//         .json({ message: "El codigo del Producto no existe" } as ManejoRespuesta);
//     }

//     if (productoDB.cantidadTotal < cantidadVendida) {
//       return res
//         .status(400)
//         .json({ message: "Cantidad insuficiente para la venta" } as ManejoRespuesta);
//     }

//     productoDB.cantidadTotal = productoDB.cantidadTotal - cantidadVendida;

//     await productoDB.save();

//     return res
//       .status(200)
//       .json({ message: "Compra Exitosa", ProductoActualizado: productoDB } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }


















