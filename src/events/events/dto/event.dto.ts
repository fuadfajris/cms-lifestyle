import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class EventDto {
  @IsInt()
  merchant_id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsInt()
  capacity?: number;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  image_venue?: string;

  @IsOptional()
  @IsString()
  hero_image?: string;

  @IsOptional()
  @IsInt()
  template_id?: number;
}
