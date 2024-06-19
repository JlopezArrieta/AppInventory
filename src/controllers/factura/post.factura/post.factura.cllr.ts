// import { RequestHandler } from "express";
// import { verificarToken } from "../../../helper/jwt";
// import { Factura } from "../../../models/factura.model/factura.model";

// interface ProductoReqBody {
//   usuarioId: number,
//   nombreCajero: string,
// }

// interface ManejoRespuesta {
//   message: string;
//   facturaDeVenta: Factura | null;
//   facturaDeCompras: Factura | null;
//   error?: any;
// }

// export const crearFactura: RequestHandler = async (req, res) => {
//   try {
//     const { usuarioId, nombreCajero }: ProductoReqBody = req.body;

//     const fecha = new Date();
//     const fechaActual = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
//     const fechaDeVenta = fechaActual.toDateString();

//     const crearFactura: Factura = await Factura.create({
//       nombreCajero: nombreCajero,
//       fechaDeCompra: fechaDeVenta,
//       estadoDeFactura: "Pagada",
//       valorApagar: valorTotal,
//       usuarioId: usuarioId
//     });

//     for (const compra of compras) {
//       await crearFactura.$add('Compras', compra);
//     }

//     const facturaDeCompras: FacturaVenta | null = await FacturaVenta.findByPk(crearFactura.id, {
//       include: [{
//         model: Compra,
//         through: { attributes: [] },//Excluye la tabla intermedia de muchos a muchos
//         attributes: { exclude: ["id"] }
//       }]
//     });

//     await Compra.destroy({ where: { usuarioId: usuarioId } });

//     return res
//       .status(200)
//       .json({ message: "Factura de Venta creada con Exito", facturaDeVenta: facturaDeCompras } as ManejoRespuesta);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
//   }
// }























