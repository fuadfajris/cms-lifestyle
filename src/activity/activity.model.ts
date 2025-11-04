import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Merchant } from 'src/merchants/merchant.model';

@Table({
  tableName: 'activity',
  timestamps: false, // karena pakai kolom created_at & updated_at custom
})
export class Activity extends Model<Activity, ActivityCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Merchant)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: 'merchant_id',
    })
    merchant_id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  content_key: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  content_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  maker?: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  approver?: string | null;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  status?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;
}

export interface ActivityCreationAttributes {
  merchant_id?: string;
  content_key?: string;
  content_name?: string;
  content?: string;
  maker?: string | null;
  approver?: string | null;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}
