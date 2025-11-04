// src/events/events.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.model';
import { Public } from '../../common/decorators/public.decorators';
import { EventDto } from './dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get('detail')
  async getEvent(
    @Query('eventId') eventId: string,
    @Query('merchantId') merchantId: string,
  ): Promise<Event | { message: string }> {
    const event = await this.eventsService.findOneByIdAndMerchant(
      +eventId,
      +merchantId,
    );

    if (!event) {
      return { message: 'Event not found' };
    }

    return event;
  }

  @Get()
  async getEventsByMerchant(
    @Query('merchantId') merchantIdStr: string,
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
    @Query('search') search?: string, // ✨ tambahkan search
  ): Promise<
    | {
        data: Event[];
        total: number;
        page: number;
        perPage: number;
        totalPages: number;
      }
    | { message: string }
  > {
    const merchantId = parseInt(merchantIdStr, 10);
    if (!merchantId) {
      return { message: 'merchantId query parameter is required' };
    }

    const pageNumber = parseInt(page, 10) || 1;
    const perPageNumber = parseInt(perPage, 10) || 10;

    const events = await this.eventsService.findAllByMerchant(
      merchantId,
      pageNumber,
      perPageNumber,
      search, // ✨ teruskan search ke service
    );

    if (!events || events.data.length === 0) {
      return { message: 'No events found for this merchant' };
    }

    return events;
  }

  @Post()
  async createEvent(@Body() eventDto: EventDto): Promise<Event> {
    return this.eventsService.createEvent(eventDto);
  }

  @Put(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() eventDto: EventDto,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, eventDto);
  }
}
