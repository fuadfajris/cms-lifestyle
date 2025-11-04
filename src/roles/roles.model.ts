import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { MerchantUser } from 'src/merchant-users/merchant-users.model';

@Table({
  tableName: 'roles',
  timestamps: false, // karena kita pakai created_at, updated_at manual
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  role_name: string;

  @Column({
    type: DataType.STRING,
  })
  role_label: string;

  @Column({
    type: DataType.STRING,
  })
  role_description: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;

  @HasMany(() => MerchantUser)
  users: MerchantUser[];
}
