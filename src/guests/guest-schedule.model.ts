// src/guest-schedules/guest-schedule.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Guest } from '../guests/guest.model';
import { Event } from '../events/events/event.model';

export interface GuestCreationAttributes {
  event_id: number;
  guest_id: number;
  schedule_date: Date;
  start_time: string;
  end_time: string;
  stage: string;
}

@Table({
  tableName: 'guest_schedules',
  timestamps: false, // karena pakai created_at custom
})
export class GuestSchedule extends Model<GuestSchedule, GuestCreationAttributes> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Guest)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'guest_id',
  })
  guest_id: number;

  @BelongsTo(() => Guest)
  guest: Guest;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'event_id',
  })
  event_id: number;

  @BelongsTo(() => Event)
  event: Event;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'schedule_date',
  })
  schedule_date: Date;

  @Column(DataType.TIME)
  start_time: string;

  @Column(DataType.TIME)
  end_time: string;

  @Column(DataType.STRING)
  stage: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  created_at: Date;
}
