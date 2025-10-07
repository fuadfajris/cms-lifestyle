// src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event)
    private eventModel: typeof Event,
  ) {}

  async findOneByIdAndMerchant(
    eventId: number,
    merchantId: number,
  ): Promise<Event | null> {
    const event = this.eventModel.findOne({
      where: { id: eventId, merchant_id: merchantId },
    });
    return event;
  }

  async findAllByMerchant(merchantId: number): Promise<Event[]> {
    return this.eventModel.findAll({
      where: { merchant_id: merchantId },
      order: [['id', 'ASC']],
    });
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const eventData = {
      merchant_id: createEventDto.merchant_id,
      name: createEventDto.name,
      description: createEventDto.description,
      location: createEventDto.location,
      capacity: createEventDto.capacity,
      status: createEventDto.status,
      start_date: createEventDto.start_date
        ? new Date(createEventDto.start_date)
        : undefined,
      end_date: createEventDto.end_date
        ? new Date(createEventDto.end_date)
        : undefined,
      image_venue: createEventDto.image_venue,
    };

    return this.eventModel.create(eventData);
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.eventModel.findByPk(id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await event.update({
      ...updateEventDto,
      start_date: updateEventDto.start_date
        ? new Date(updateEventDto.start_date)
        : event.start_date,
      end_date: updateEventDto.end_date
        ? new Date(updateEventDto.end_date)
        : event.end_date,
    });

    return event;
  }
}
