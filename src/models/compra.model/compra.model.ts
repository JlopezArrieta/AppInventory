import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { FacturaVenta } from "../facturaVenta.model/facturaVenta.model";
import { Producto } from "../producto.model/producto.model";
import { CompraProducto } from "./compraProducto.model";
import { FacturaVentaCompra } from "../facturaVenta.model/FacturaVentaCompra.model";

@Table({
    timestamps: false,
    tableName: "compras"
})

export class Compra extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cantidad!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    referencia!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nombreProducto!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    precioPorKg!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    precioTotal!: number

    //Relacion uno(compra) a muchos(facturaVenta).
    // @HasMany(() => FacturaVenta)
    // facturaVenta!: FacturaVenta[];

    //Relacion muchos a muchos compra con producto.
    @BelongsToMany(() => Producto, () => CompraProducto)
    Productos!: Producto[];

    //Relacion muchos a muchos compra con factura.
    @BelongsToMany(() => FacturaVenta, () => FacturaVentaCompra)
    facturaVentas!: FacturaVenta[];
}














