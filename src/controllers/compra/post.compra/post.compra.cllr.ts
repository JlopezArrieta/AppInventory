import { RequestHandler } from "express";
import { Compra } from "../../../models/compra.model/compra.model";
import { Carrito } from "../../../models/carrito.model/carrito.model";
import { Producto } from "../../../models/producto.model/producto.model";
import { Factura } from "../../../models/factura.model/factura.model";
import { Detalle } from "../../../models/detalle.model/detalle.model";
import { Inventario } from "../../../models/inventario.model/inventario.model";
import moment from "moment-timezone";
import { verificarToken } from "../../../helper/jwt";
import { Usuario } from "../../../models/usuario.model/usuario.model";
import { sendEmail } from "../../../config/nodemailer.config";

interface ManejoRespuesta {//
  message: string;
  compra: Compra | null;
  detalles: Detalle[] | null;
  factura: Object | null;
  error?: any;
}

interface CompraReqBody {
  metodoDePago: string,
  usuarioId: number,
}

export const crearCompra: RequestHandler = async (req, res) => {
  try {
    const { metodoDePago, usuarioId }: CompraReqBody = req.body;

    if (!metodoDePago || !usuarioId) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorio" } as ManejoRespuesta);
    }

    const carritos: Carrito[] = await Carrito.findAll({
      where: {
        usuarioId: usuarioId
      },
      include: [Producto]
    });

    if (carritos.length === 0) {
      return res
        .status(400)
        .json({ message: `Carrito vacio, verifique el Id: ${usuarioId} del usuario` } as ManejoRespuesta);
    }

    for (const carrito of carritos) {
      let inventario: Inventario | null = await Inventario.findOne({
        where: {
          productoId: carrito.productoId
        }
      });

      if (!inventario || carrito.cantidad > inventario.cantidadDisponible) {
        return res
          .status(400)
          .json({ message: `El producto ${carrito.producto.nombre} no tiene esa cantidad disponible` } as ManejoRespuesta);
      }
    }

    const fecha = moment.tz("America/Bogota").format("YYYY-MM-DD hh:mm:ss A");

    let precioTotal: number = 0;
    for (const carrito of carritos) {
      precioTotal = precioTotal + carrito.subTotal;
    };

    const compra: Compra | null = await Compra.create({
      fechaCompra: fecha,
      valorTotal: precioTotal,
      metodoDePago: metodoDePago,
      estado: "Activa"
    });

    //Obtener nombre del vendedor para que aparezca en la factura y asi realizar una busqueda del vendedor.
    let nombreCajero: string = "";
    let vendedorId: string = "";
    const token: any = req.headers.token;

    if (token) {
      const accesoToken = await verificarToken(token);
      if (accesoToken.rol === "Admin" || accesoToken.rol === "Empleado") {
        nombreCajero = accesoToken.nombresApellidos;
        vendedorId = accesoToken.id;
      }
    } else {
      return res
        .status(400)
        .json({ message: `No se ha proporcionado un Token` } as ManejoRespuesta);
    }

    const factura: Factura | null = await Factura.create({
      usuarioId: usuarioId,
      compraId: compra.id,
      fechaEmision: fecha,
      estado: "Activa",
      empleadoId: vendedorId,
      nombreVendedor: nombreCajero
    })

    const detalles: Detalle[] | null = [];
    for (const carrito of carritos) {

      const inventario: Inventario | null = await Inventario.findOne({
        where: {
          productoId: carrito.productoId
        }
      });

      if (inventario) {
        inventario.cantidadVendidas = inventario.cantidadVendidas + carrito.cantidad;
        inventario.cantidadDisponible = inventario.cantidadDisponible - carrito.cantidad;

        let disponible: string = "";
        if (inventario.cantidadDisponible > 0) {
          disponible = "Si";
        } else {
          disponible = "No";
        }
        inventario.disponibilidad = disponible;
        inventario.save();

        const detalle: Detalle | null = await Detalle.create({
          facturaId: factura.id,
          inventarioId: inventario?.id,
          cantidad: carrito.cantidad,
          producto: carrito.producto.nombre,
          precioUnitario: carrito.producto.precioUnitario,
          valorTotal: carrito.subTotal
        });
        detalles.push(detalle);
      } else {
        return res
          .status(400)
          .json({
            message: `El Inventario con el Id: ${carrito.productoId} no existe en la base de datos`
          } as ManejoRespuesta);
      }
    }

    await Carrito.destroy({
      where: {
        usuarioId
      }
    });

    //Generar el contenido del correo
    let detallesTexto = '';
    for (const detalle of detalles) {
      detallesTexto += `Producto: ${detalle.producto}, Cantidad: ${detalle.cantidad}, Precio Unitario: ${detalle.precioUnitario}, Total: ${detalle.valorTotal}\n`;
    }

    const facturaText = `Factura ID: ${factura.id}\nNombre del Vendedor: ${nombreCajero}\nFecha de Emisión: ${fecha}\nTotal: ${precioTotal}\n\nDetalles de la compra:\n${detallesTexto}`;

    //Enviar correo con la factura y detalles
    const usuario: Usuario | null = await Usuario.findByPk(usuarioId);
    if (usuario) {
      sendEmail(usuario.correo, 'Compra Realizada', facturaText);
    }

    return res
      .status(200)
      .json({ message: 'Compra realizada con éxito', compra, factura, detalles } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
};






//si el cliente elimina la compra se debe devolver












