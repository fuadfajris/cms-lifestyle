// src/tickets/ticket-detail/ticket-detail.controller.ts
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { TicketDetailService } from './ticket-detail.service';
import { TicketDetail } from './ticket-detail.model';
import { Public } from '../../common/decorators/public.decorators';

@Controller('ticket-details')
export class TicketDetailController {
  constructor(private readonly ticketDetailService: TicketDetailService) {}

  @Public()
  @Post()
  async create(@Body() ticketData: Partial<TicketDetail>): Promise<TicketDetail> {
    return this.ticketDetailService.create(ticketData);
  }

   @Get()
  async getTicketDetails(@Query('order_id') orderId: string) {
    return this.ticketDetailService.getTicketDetailsByOrder(Number(orderId));
  }
}
