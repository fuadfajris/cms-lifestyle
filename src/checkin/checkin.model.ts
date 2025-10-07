import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TicketDetail } from '../tickets/ticket-detail/ticket-detail.model';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';

@Table({ tableName: 'checkins', timestamps: false })
export class Checkin extends Model<
  InferAttributes<Checkin>,
  InferCreationAttributes<Checkin>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: CreationOptional<number>;

  @ForeignKey(() => TicketDetail)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'ticket_detail_id',
  })
  declare ticket_detail_id: number;

  @BelongsTo(() => TicketDetail)
  declare ticket_detail?: NonAttribute<TicketDetail>;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'checked_in_at',
    defaultValue: DataType.NOW,
  })
  declare checked_in_at: CreationOptional<Date>;
}
