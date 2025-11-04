// src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './event.model';
import { EventDto } from './dto/event.dto';
import { Op } from 'sequelize';

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

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

  // async findAllByMerchant(
  //   merchantId: number,
  //   page = 1,
  //   perPage = 10,
  //   search?: string, // ✨ parameter search
  // ): Promise<PaginatedResult<Event>> {
  //   const offset = (page - 1) * perPage;

  //   const whereClause: any = {
  //     merchant_id: merchantId,
  //   };

  //   if (search) {
  //     whereClause.name = { [Op.iLike]: `%${search}%` };
  //   }

  //   const { rows, count } = await this.eventModel.findAndCountAll({
  //     where: whereClause,
  //     order: [['id', 'ASC']],
  //     limit: perPage,
  //     offset,
  //   });

  //   return {
  //     data: rows,
  //     total: count,
  //     page,
  //     perPage,
  //     totalPages: Math.ceil(count / perPage),
  //   };
  // }

  async findAllByMerchant(
    merchantId: number,
    page = 1,
    perPage = 10,
    search?: string,
  ): Promise<PaginatedResult<Event>> {
    const offset = (page - 1) * perPage;

    const whereClause: any = { merchant_id: merchantId };

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    const queryOptions: any = {
      where: whereClause,
      order: [['id', 'ASC']],
    };

    // ⚡ Jika perPage bukan 0, baru terapkan pagination
    if (perPage !== 0) {
      queryOptions.limit = perPage;
      queryOptions.offset = offset;
    }

    const { rows, count } = await this.eventModel.findAndCountAll(queryOptions);

    return {
      data: rows,
      total: count,
      page,
      perPage,
      totalPages: perPage === 0 ? 1 : Math.ceil(count / perPage),
    };
  }

  async createEvent(eventDto: EventDto): Promise<Event> {
    const eventData = {
      merchant_id: eventDto.merchant_id,
      name: eventDto.name,
      description: eventDto.description,
      location: eventDto.location,
      capacity: eventDto.capacity,
      status: eventDto.status,
      start_date: eventDto.start_date
        ? new Date(eventDto.start_date)
        : undefined,
      end_date: eventDto.end_date ? new Date(eventDto.end_date) : undefined,
      image_venue: eventDto.image_venue,
      hero_image: eventDto.hero_image,
      template_id: eventDto.template_id,
    };

    return this.eventModel.create(eventData);
  }

  async updateEvent(id: number, eventDto: EventDto): Promise<Event> {
    const event = await this.eventModel.findByPk(id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await event.update({
      ...eventDto,
      start_date: eventDto.start_date
        ? new Date(eventDto.start_date)
        : event.start_date,
      end_date: eventDto.end_date
        ? new Date(eventDto.end_date)
        : event.end_date,
    });

    return event;
  }
}
