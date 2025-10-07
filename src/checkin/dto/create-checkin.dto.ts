// src/checkins/dto/create-checkin.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCheckinDto {
  @IsInt()
  @IsNotEmpty()
  ticket_detail_id: number;
}
