import { Controller, Post, Body, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { OrderTransactionsService } from './order-transactions.service';
import { OrderTransaction } from './order-transaction.model';
import { Public } from 'src/common/decorators/public.decorators';

@Controller('order-transactions')
export class OrderTransactionsController {
  constructor(private readonly orderTransactionsService: OrderTransactionsService) {}

  @Public()
  @Post()
  async create(@Body() body: Partial<OrderTransaction>) {
    return this.orderTransactionsService.create(body);
  }

  @Get()
  async getOrdersByEvent(@Query('event_id') eventId: number) {
    return this.orderTransactionsService.getOrdersByEvent(eventId);
  }

  @Get('order')
  async getOrders(@Query('event_id') eventId: number) {
    return this.orderTransactionsService.getOrdersByEventV2(eventId);
  }
}
