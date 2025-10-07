import { Module } from '@nestjs/common';
import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Checkin } from './checkin.model';
import { TicketDetail } from '../tickets/ticket-detail/ticket-detail.model';
import { OrderTransaction } from '../order-transaction/order-transaction.model';

@Module({
  imports: [SequelizeModule.forFeature([Checkin, TicketDetail, OrderTransaction])],
  controllers: [CheckinController],
  providers: [CheckinService]
})
export class CheckinModule {}
