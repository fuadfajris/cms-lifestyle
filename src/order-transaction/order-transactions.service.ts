import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderTransaction } from './order-transaction.model';
import { User } from '../users/user.model';
import { Event } from '../events/events/event.model';
import { Ticket } from '../tickets/ticket.model';
import { TicketDetail } from 'src/tickets/ticket-detail/ticket-detail.model';

@Injectable()
export class OrderTransactionsService {
  constructor(
    @InjectModel(OrderTransaction)
    private readonly orderTransactionModel: typeof OrderTransaction,
  ) {}

  async create(
    orderData: Partial<OrderTransaction>,
  ): Promise<OrderTransaction> {
    // langsung insert ke DB
    return this.orderTransactionModel.create(orderData as OrderTransaction);
  }

  async getOrdersByEvent(eventId: number) {
    return this.orderTransactionModel.findAll({
      where: {
        status: 'paid',
        event_id: eventId,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'phone'],
        },
        {
          model: Event,
          attributes: ['start_date'],
        },
        {
          model: Ticket,
        },
        {
          model: TicketDetail,
          attributes: ['id', 'event_date', 'gender'],
        },
      ],
      order: [['order_date', 'DESC']],
    });
  }

  async getOrdersByEventV2(eventId: number) {
    return this.orderTransactionModel.findAll({
      where: {
        status: 'paid',
        event_id: eventId,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'phone'],
        },
      ],
      order: [['order_date', 'DESC']],
    });
  }
}
