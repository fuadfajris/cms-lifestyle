import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Event } from '../events/events/event.model';

@Table({ tableName: 'tickets', timestamps: false })
export class Ticket extends Model<Ticket> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ticket_type: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity_available: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  valid_from_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  valid_to_date: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  access_special_show: boolean;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  event_id: number;

  @BelongsTo(() => Event)
  event: Event;
}
