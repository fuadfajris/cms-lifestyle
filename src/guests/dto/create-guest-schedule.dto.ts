import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateGuestScheduleDto {
  @IsInt()
  guest_id: number;

  @IsInt()
  event_id: number;

  @IsDateString()
  schedule_date: string;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsString()
  @IsNotEmpty()
  stage: string;
}
