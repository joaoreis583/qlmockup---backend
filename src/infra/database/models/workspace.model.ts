import { Column, DataType, Table, Model } from "sequelize-typescript";

export enum Plan {
  FREE = 'FREE',
  GOLD = 'GOLD',
  MASTER = 'MASTER',
}

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
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string

    @Column({
        type: DataType.ENUM('FREE', 'GOLD', 'MASTER'), 
        defaultValue: Plan.FREE 
    })
    declare plan: Plan
}