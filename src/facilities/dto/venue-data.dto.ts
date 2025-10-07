import { Event } from "src/events/events/event.model";

// src/facilities/dto/venue-data.dto.ts
export class VenueDataDto {
  event: Event
  parking?: string | null;
  food_court?: string | null;
}
