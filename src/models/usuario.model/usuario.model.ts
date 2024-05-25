import { Table, Model, Column, DataType } from "sequelize-typescript";



@Table({
    timestamps: false,
    tableName: "productos"
})

export class Producto extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nombre!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cantidadTotal!: number

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    marca!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    codigo!: string

    @Column({
        type: DataType.ENUM("Activo", "No Activo"),
        allowNull: false,
        defaultValue: "Activo",
    })
    estado!: string

    @Column({
        type: DataType.ENUM("SI", "NO"),
        allowNull: false,
    })
    disponibilidad!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lote!: string

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fecha!: Date

    //Relacion muchos a muchos producto con compra.
    //@BelongsToMany(() => Compra, () => CompraProducto)
    //Compras!: Compra[];
}















