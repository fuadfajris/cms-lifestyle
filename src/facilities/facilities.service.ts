// src/facilities/facilities.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Facility } from './facilities.model';
import { Event } from '../events/events/event.model';
import { VenueDataDto } from './dto/venue-data.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectModel(Facility)
    private readonly facilityModel: typeof Facility,
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async fetchVenueData(
    eventId: number,
    merchant_id: number,
  ): Promise<VenueDataDto | null> {
    const event = await this.eventModel.findOne({
      where: { id: eventId, merchant_id: merchant_id },
    });
    
    if (!event) return null;

    const facilities = await this.facilityModel.findAll({
      where: { event_id: eventId },
      raw: true,
    });

    return {
      event,
      parking:
        facilities.find((f) => f.name?.toLowerCase() === 'parking')
          ?.description || null,
      food_court:
        facilities.find((f) => f.name?.toLowerCase() === 'food court')
          ?.description || null,
    };
  }
}
