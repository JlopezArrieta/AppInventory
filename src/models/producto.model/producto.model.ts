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
    cantidad!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    precio!: number

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
}














