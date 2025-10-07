// src/guests/guest.model.ts
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
import { GuestSchedule } from './guest-schedule.model';

@Table({
  tableName: 'guests',
  timestamps: false, // tabel ini tidak pakai default createdAt/updatedAt Sequelize
})
export class Guest extends Model<Guest> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  role: string;

  @Column({
    type: DataType.STRING,
    field: 'invitation_status',
    defaultValue: 'invited',
  })
  invitation_status: string;

  @Column(DataType.TEXT)
  category: string;

  @Column(DataType.TEXT)
  image: string;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    field: 'event_id',
  })
  event_id: number;

  @BelongsTo(() => Event)
  event: Event;

  @HasMany(() => GuestSchedule)
  guest_schedules: GuestSchedule[];
}
