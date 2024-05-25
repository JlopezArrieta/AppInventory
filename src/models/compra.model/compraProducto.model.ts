import { Table, Model, ForeignKey } from "sequelize-typescript";
import { Compra } from "./compra.model";
import { Producto } from "../producto.model/producto.model";


@Table({
    timestamps: false,
    tableName: "CompraProductos"
})

export class CompraProducto extends Model {
    @ForeignKey(() => Compra)
    compraId!: string;

    @ForeignKey(() => Producto)
    productoId!: number;
}






















