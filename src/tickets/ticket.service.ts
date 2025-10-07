import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket,
  ) {}

  async findByEvent(eventId: number) {
    const tickets = await this.ticketModel.findAll({
      where: { event_id: eventId },
      raw: true,
    });
    
    return tickets
  }
}
