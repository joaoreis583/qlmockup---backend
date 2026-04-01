import { Column, DataType, Table, Model } from "sequelize-typescript";

@Table({
  tableName: "workspaces",
  timestamps: true,
})
export class WorkspaceModel extends Model<WorkspaceModel> {
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
        unique: true,
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare owner_id: string
}
