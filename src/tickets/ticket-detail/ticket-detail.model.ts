// src/tickets/ticket-detail/ticket-detail.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { OrderTransaction } from '../../order-transaction/order-transaction.model';

interface TicketDetailAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  age?: number;
  gender?: string;
  ticket_status: string;
  event_date?: string;
  order_id: number;
}

// biar Sequelize tau field mana yg optional
export interface TicketDetailCreationAttributes extends Omit<TicketDetailAttributes, 'id'> {}

@Table({
  tableName: 'ticket_details',
  timestamps: false,
})
export class TicketDetail extends Model<TicketDetailAttributes, TicketDetailCreationAttributes> {
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
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  age?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  gender?: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'valid',
  })
  ticket_status: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  event_date?: string;

  @ForeignKey(() => OrderTransaction)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @BelongsTo(() => OrderTransaction)
  order: OrderTransaction;

  // @HasMany(() => Checkin)
  // checkins: Checkin[];
}
