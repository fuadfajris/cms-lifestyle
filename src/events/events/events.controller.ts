// src/events/events.controller.ts
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.model';
import { Public } from '../../common/decorators/public.decorators';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get()
  async getEvent(
    @Query('event_id') eventId: string,
    @Query('merchant_id') merchantId: string,
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

  @Public()
  @Get('merchant/:merchantId')
  async getEventsByMerchant(
    @Param('merchantId', ParseIntPipe) merchantId: number,
  ): Promise<Event[] | { message: string }> {
    const events = await this.eventsService.findAllByMerchant(merchantId);

    if (!events || events.length === 0) {
      return { message: 'No events found for this merchant' };
    }

    return events;
  }

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(createEventDto);
  }

  @Put(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, updateEventDto);
  }
}
