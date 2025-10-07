// guests.controller.ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { GuestsService } from './guest.service'
import { Public } from '../common/decorators/public.decorators'
import { CreateGuestScheduleDto } from './dto/create-guest-schedule.dto';
import { UpdateGuestScheduleDto } from './dto/update-guest-schedule.dto';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Public()
  @Get('stars')
  async getGuestStars(@Query('event_id') eventId: string) {
    return this.guestsService.fetchGuestStars(Number(eventId))
  }

  @Get('lineup')
  async getAllLineup() {
    return this.guestsService.fetchAllLineup();
  }

  @Get('lineup/:eventId')
  async getLineup(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.guestsService.fetchLineup(Number(eventId));
  }

  @Post('lineup')
  async create(@Body() dto: CreateGuestScheduleDto) {
    return this.guestsService.createSchedule(dto);
  }

  @Put('lineup/:id')
  async updateSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGuestScheduleDto,
  ) {
    return this.guestsService.updateSchedule(id, dto);
  }

  @Delete('lineup/:id')
  async deleteSchedule(@Param('id', ParseIntPipe) id: number) {
    return this.guestsService.deleteSchedule(id);
  }
}
