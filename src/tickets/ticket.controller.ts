import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { Public } from '../common/decorators/public.decorators';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Public()
  @Get('event')
  async getTicketsByEvent(@Query('event_id') eventId: string) {
    return this.ticketsService.findByEvent(+eventId);
  }
}
