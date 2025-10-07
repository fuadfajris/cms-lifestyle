// guests.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Guest } from './guest.model';
import { GuestSchedule } from './guest-schedule.model';
import { CreateGuestScheduleDto } from './dto/create-guest-schedule.dto';
import { UpdateGuestScheduleDto } from './dto/update-guest-schedule.dto';

@Injectable()
export class GuestsService {
  constructor(
    @InjectModel(Guest)
    private readonly guestModel: typeof Guest,

    @InjectModel(GuestSchedule)
    private readonly guestScheduleModel: typeof GuestSchedule,
  ) {}

  async fetchGuestStars(eventId: number) {
    return this.guestModel.findAll({
      where: { event_id: eventId },
      include: [GuestSchedule],
    });
  }

  async fetchAllLineup() {
    return this.guestModel.findAll();
  }

  async fetchLineup(eventId: number) {
    return this.guestScheduleModel.findAll({
      where: { event_id: eventId },
      order: [['start_time', 'ASC']],
      include: [Guest],
    });
  }

  async createSchedule(dto: CreateGuestScheduleDto): Promise<GuestSchedule> {
    return this.guestScheduleModel.create({
      guest_id: dto.guest_id,
      event_id: dto.event_id,
      schedule_date: new Date(dto.schedule_date),
      start_time: dto.start_time,
      end_time: dto.end_time,
      stage: dto.stage,
    });
  }

  async updateSchedule(
    id: number,
    dto: UpdateGuestScheduleDto,
  ): Promise<GuestSchedule> {
    const schedule = await this.guestScheduleModel.findByPk(id);
    if (!schedule) {
      throw new NotFoundException(`Guest schedule with ID ${id} not found`);
    }

    await schedule.update({
      ...dto,
      schedule_date: dto.schedule_date
        ? new Date(dto.schedule_date)
        : schedule.schedule_date,
    });

    return schedule;
  }

  async deleteSchedule(id: number): Promise<{ message: string }> {
    const schedule = await this.guestScheduleModel.findByPk(id);
    console.log("schedule : ", schedule)
    if (!schedule) {
      throw new NotFoundException(`Guest schedule with ID ${id} not found`);
    }

    await schedule.destroy();

    return { message: `Guest schedule with ID ${id} deleted successfully` };
  }
}
