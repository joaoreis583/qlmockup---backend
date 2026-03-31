import { Column, DataType, Table, Model } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, // Assuming email should be unique
    })
    declare owner_id: string
}
