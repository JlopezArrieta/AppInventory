import { RequestHandler } from "express";
import { Carrito } from "../../../models/carrito.model/carrito.model";
import { Producto } from "../../../models/producto.model/producto.model";

interface CarritoReqBody {
  usuarioId: number,
  productoId: number,
  cantidad: number
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

    let carrito: Carrito | null = await Carrito.findOne({
      where: {
        usuarioId: usuarioId,
        productoId: productoId
      }
    });

    if (carrito) {
      carrito.cantidad = carrito.cantidad + cantidad;
      carrito.subTotal = carrito.cantidad * producto.precioUnitario;
      await carrito.save();
    } else {
      let valorTotal: number = cantidad * producto?.precioUnitario

      carrito = await Carrito.create({
        usuarioId: usuarioId,
        productoId: productoId,
        cantidad: cantidad,
        subTotal: valorTotal,
      });
    }

    producto.cantidadTotal = producto.cantidadTotal - cantidad;
    await producto.save();

    return res
      .status(200)
      .json({ message: "Producto Agregado al Carrito", carrito } as ManejoRespuesta);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo salio mal", error: error } as ManejoRespuesta);
  }
}




