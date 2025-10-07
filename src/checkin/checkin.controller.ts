import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CreateCheckinDto } from './dto/create-checkin.dto';

@Controller('checkins')
export class CheckinController {
  constructor(private readonly checkinsService: CheckinService) {}

  @Get()
  async getCheckins(@Query('event_id') eventId: string) {
    return this.checkinsService.getCheckinsByEvent(Number(eventId));
  }

  @Post()
  async createCheckin(@Body() dto: CreateCheckinDto) {
    return this.checkinsService.createCheckin(dto.ticket_detail_id);
  }

  @Get('all-checkins')
  async getCheckinsV2(@Query('event_id') eventId: string) {
    return this.checkinsService.getCheckinsByEventV2(Number(eventId));
  }
}
