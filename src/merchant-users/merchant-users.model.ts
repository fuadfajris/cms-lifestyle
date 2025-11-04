import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Merchant } from '../merchants/merchant.model';
import { Role } from 'src/roles/roles.model';

@Table({
  tableName: 'merchant_users',
  timestamps: false,
})
export class MerchantUser extends Model<MerchantUser> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ForeignKey(() => Merchant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  merchant_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo: string;

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

  @BelongsTo(() => Merchant)
  merchant: Merchant;

  @BelongsTo(() => Role)
  role: Role;
}
