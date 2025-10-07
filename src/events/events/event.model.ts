// src/events/event.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Merchant } from '../../merchants/merchant.model';

export interface EventCreationAttributes {
  merchant_id: number;
  name: string;
  description?: string;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  capacity?: number;
  status: boolean;
  image_venue?: string;
}

@Table({
  tableName: 'events',
  timestamps: false,
})
export class Event extends Model<Event, EventCreationAttributes> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.STRING)
  location?: string;

  @Column({ type: DataType.DATE, field: 'start_date' })
  start_date?: Date;

  @Column({ type: DataType.DATE, field: 'end_date' })
  end_date?: Date;

  @Column(DataType.INTEGER)
  capacity?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  status: boolean;

  @Column({ type: DataType.TEXT, field: 'image_venue' })
  image_venue?: string;

  @Column({ type: DataType.INTEGER, field: 'template_id', defaultValue: 1 })
  template_id?: number;

  @Column({ type: DataType.TEXT, field: 'hero_image' })
  hero_image?: string;

  //   @BelongsTo(() => Merchant)
  //   merchant: Merchant;
}
