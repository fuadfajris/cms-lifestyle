// src/tickets/ticket-detail/ticket-detail.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketDetail } from './ticket-detail.model';
import { TicketDetailService } from './ticket-detail.service';
import { TicketDetailController } from './ticket-detail.controller';
import { Checkin } from '../../checkin/checkin.model';

@Module({
  imports: [SequelizeModule.forFeature([TicketDetail, Checkin])],
  providers: [TicketDetailService],
  controllers: [TicketDetailController],
  exports: [TicketDetailService],
})
export class TicketDetailModule {}
