import { RequestHandler } from "express";
import { Carrito } from "../../../models/carrito.model/carrito.model";
import { Producto } from "../../../models/producto.model/producto.model";
import { Usuario } from "../../../models/usuario.model/usuario.model";
import { Inventario } from "../../../models/inventario.model/inventario.model";

interface CarritoReqBody {//
  usuarioId: number,
  productoId: number,
  cantidad: number,
  metodoPago: string
}

interface ManejoRespuesta {
  message: string;
  carrito: Carrito | null;
  error?: any;
}

export const agregarProductoCarrito: RequestHandler = async (req, res) => {
  try {
    const { usuarioId, productoId, cantidad }: CarritoReqBody = req.body;

    if (!usuarioId || !productoId || !cantidad) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" } as ManejoRespuesta);
    }

    const producto: Producto | null = await Producto.findByPk(productoId);
    if (!producto) {
      return res
        .status(400)
        .json({ message: "El Producto no existe en la base de datos" } as ManejoRespuesta);
    }

    const usuario: Usuario | null = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res
        .status(400)
        .json({ message: "El Usuario no existe en la base de datos" } as ManejoRespuesta);
    }

    //Mirar disponibilidad de productos.
    const inventario: Inventario | null = await Inventario.findOne({
      where: {
        productoId: productoId
      }
    });

    if (!inventario || inventario.cantidadDisponible < cantidad) {
      return res
        .status(400)
        .json({ message: "El Producto no está disponible en la cantidad solicitada" } as ManejoRespuesta);
    }


    let carrito: Carrito | null = await Carrito.findOne({
      where: {
        usuarioId: usuarioId,
        productoId: productoId
      }
    });

    if (carrito) {
      if ((cantidad + carrito.cantidad) <= inventario.cantidadDisponible) {
        carrito.cantidad = carrito.cantidad + cantidad;
        carrito.subTotal = Math.round(carrito.cantidad * producto.precioUnitario * 100) / 100;
        await carrito.save();
      } else {
        return res
          .status(400)
          .json({ message: "La cantidad agregada al carrito superan la cantidad disponible del producto" } as ManejoRespuesta);
      }
    } else {
      let total: number = Math.round(cantidad * producto?.precioUnitario * 100) / 100;
      carrito = await Carrito.create({
        usuarioId: usuarioId,
        productoId: productoId,
        cantidad: cantidad,
        subTotal: total,
      });
    }

    return res
      .status(200)
      .json({ message: "Producto Agregado al Carrito", carrito } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}




