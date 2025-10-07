import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ticket } from './ticket.model';
import { TicketsService } from './ticket.service';
import { TicketsController } from './ticket.controller';

@Module({
  imports: [SequelizeModule.forFeature([Ticket])],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
