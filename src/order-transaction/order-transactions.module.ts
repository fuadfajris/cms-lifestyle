import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderTransaction } from './order-transaction.model';
import { OrderTransactionsService } from './order-transactions.service';
import { OrderTransactionsController } from './order-transactions.controller';
import { User } from '../users/user.model';
import { Event } from '../events/events/event.model';
import { Ticket } from '../tickets/ticket.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderTransaction, User, Event, Ticket])],
  providers: [OrderTransactionsService],
  controllers: [OrderTransactionsController],
})
export class OrderTransactionsModule {}
