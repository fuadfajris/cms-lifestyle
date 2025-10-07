// src/merchants/merchant.model.ts
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Event } from '../events/events/event.model';

@Table({
  tableName: 'merchants',
  timestamps: false, // tabel ini pakai created_at custom, bukan default updatedAt/createdAt Sequelize
})
export class Merchant extends Model<Merchant> {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  created_at: Date;

  // Relasi: Merchant punya banyak Event
  @HasMany(() => Event)
  events: Event[];
}
