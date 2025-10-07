import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Checkin } from './checkin.model';
import { TicketDetail } from '../tickets/ticket-detail/ticket-detail.model';
import { OrderTransaction } from '../order-transaction/order-transaction.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class CheckinService {
  constructor(
    @InjectModel(Checkin)
    private readonly checkinModel: typeof Checkin,
  ) {}

  async getCheckinsByEvent(eventId: number): Promise<Checkin[]> {
    return this.checkinModel.findAll({
      where: Sequelize.literal(`checked_in_at IS NOT NULL`),
      include: [
        {
          model: TicketDetail,
          attributes: ['gender', 'order_id'],
          include: [
            {
              model: OrderTransaction,
              attributes: ['event_id'],
              where: { event_id: eventId },
            },
          ],
        },
      ],
    });
  }

  async createCheckin(ticket_detail_id: number): Promise<Checkin> {
    // Cek apakah sudah pernah checkin
    const existing = await this.checkinModel.findOne({
      where: { ticket_detail_id },
    });

    if (existing) {
      throw new BadRequestException('Ticket sudah pernah di-checkin');
    }

    return this.checkinModel.create({
      ticket_detail_id,
      checked_in_at: new Date(),
    });
  }

  async getCheckinsByEventV2(eventId: number) {
    return this.checkinModel.findAll({
      attributes: ['id', 'checked_in_at'],
      include: [
        {
          model: TicketDetail,
          attributes: [
            'id',
            'name',
            'email',
            'phone',
            'age',
            'gender',
            'ticket_status',
            'event_date',
          ],
          include: [
            {
              model: OrderTransaction,
              attributes: ['id', 'event_id'],
              where: { event_id: eventId }, // filter event_id di orders
              required: true, // inner join
            },
          ],
          required: true, // inner join
        },
      ],
      order: [['id', 'ASC']],
    });
  }
}
