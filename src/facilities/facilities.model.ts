// src/facilities/facility.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Event } from '../events/events/event.model';

@Table({ tableName: 'facilities', timestamps: false })
export class Facility extends Model<Facility> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER, allowNull: false })
  event_id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING })
  category: string;

  @BelongsTo(() => Event)
  event: Event;
}
