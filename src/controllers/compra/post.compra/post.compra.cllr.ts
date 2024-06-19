// import { RequestHandler } from "express";
// import { Compra } from "../../../models/compra.model/compra.model";
// import { Producto } from "../../../models/producto.model/producto.model";

// interface ManejoRespuesta {
//   message: string;
//   compraCreada: Compra;
//   arrayCompras: Compra[];
//   error?: any;
// }

// interface ProductoReqBody {
//   codigoProducto: string;
//   cantidadVendida: number;
//   usuarioId: number
// }

// export const crearCompra: RequestHandler = async (req, res) => {
//   try {
//     const { codigoProducto, cantidadVendida, usuarioId }: ProductoReqBody = req.body;

//     if (!codigoProducto || !usuarioId || cantidadVendida === 0) {
//       return res
//         .status(400)
//         .json({ message: "Debe proporcionar al menos un producto con cantidad" } as ManejoRespuesta);
//     }

//     const productoDB: Producto | null = await Producto.findOne({
//       where: {
//         codigo: codigoProducto
//       }
//     });

//     if (!productoDB) {
//       return res
//         .status(400)
//         .json({ message: "El Producto no Existe" } as ManejoRespuesta);
//     }

//     if (productoDB.cantidadTotal < cantidadVendida) {
//       return res
//         .status(400)
//         .json({ message: "Cantidad insuficiente para la venta" } as ManejoRespuesta);
//     }

//     productoDB.cantidadTotal = productoDB.cantidadTotal - cantidadVendida;
//     await productoDB.save();

//     const valorTotal = Math.round(productoDB.precioUnitario * cantidadVendida * 100) / 100;
//     const cantVend = Math.round(cantidadVendida * 100) / 100;

//     const compraCreada: Compra = await Compra.create({
//       cantidad: cantVend,
//       referencia: codigoProducto,
//       nombreProducto: productoDB.nombre,
//       precioUnitario: productoDB.precioUnitario,
//       precioTotal: valorTotal,
//       usuarioId: usuarioId,
//     });

//     return res
//       .status(200)
//       .json({ message: "Compra Creada con Exito", compraCreada } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }

















