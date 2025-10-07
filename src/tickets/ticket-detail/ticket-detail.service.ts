// src/tickets/ticket-detail/ticket-detail.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TicketDetail } from './ticket-detail.model';
import { OrderTransaction } from '../../order-transaction/order-transaction.model';
import { Ticket } from '../ticket.model';

@Injectable()
export class TicketDetailService {
  constructor(
    @InjectModel(TicketDetail)
    private ticketDetailModel: typeof TicketDetail,
  ) {}

  async create(ticketData: Partial<TicketDetail>): Promise<TicketDetail> {
    return await this.ticketDetailModel.create(ticketData as TicketDetail);
  }

  async getTicketDetailsByOrder(orderId: number): Promise<TicketDetail[]> {
    return this.ticketDetailModel.findAll({
      where: { order_id: orderId },
      include: [
        {
          model: OrderTransaction,
          attributes: ['id'],
          include: [
            {
              model: Ticket,
              attributes: ['ticket_type', 'price'],
            },
          ],
        },
        // {
        //   model: Checkin,
        //   attributes: ['id', 'checked_in_at'],
        // },
      ],
    });
  }
}
