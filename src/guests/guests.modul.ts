import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Guest } from './guest.model';
import { GuestSchedule } from './guest-schedule.model';
import { GuestsService } from './guest.service';
import { GuestsController } from './guest.controller';

@Module({
  imports: [SequelizeModule.forFeature([Guest, GuestSchedule])],
  controllers: [GuestsController],
  providers: [GuestsService],
})
export class GuestsModule {}
