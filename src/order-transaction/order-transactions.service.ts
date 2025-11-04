import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderTransaction } from './order-transaction.model';
import { User } from '../users/user.model';
import { Event } from '../events/events/event.model';
import { Ticket } from '../tickets/ticket.model';
import { TicketDetail } from 'src/tickets/ticket-detail/ticket-detail.model';
import { Op, fn, col, where as sqWhere } from 'sequelize';

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

  async getOrdersByEventV2(
    eventId: number,
    page = 1,
    limit = 10,
    search?: string,
  ) {
    const offset = (page - 1) * limit;

    const whereClause: any = {
      status: 'paid',
      event_id: eventId,
    };

    const userInclude: any = {
      model: User,
      attributes: ['name', 'email', 'phone'],
    };

    if (search) {
      userInclude.where = {
        [Op.and]: [
          sqWhere(fn('LOWER', col('name')), {
            [Op.like]: `%${search.toLowerCase()}%`,
          }),
        ],
      };
    }

    const { rows, count } = await this.orderTransactionModel.findAndCountAll({
      where: whereClause,
      include: [userInclude],
      order: [['order_date', 'DESC']],
      limit,
      offset,
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
