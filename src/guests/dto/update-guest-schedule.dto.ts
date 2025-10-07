import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestScheduleDto } from './create-guest-schedule.dto';

export class UpdateGuestScheduleDto extends PartialType(CreateGuestScheduleDto) {}
