import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Template } from './templates.model';
import { Feature } from '../features/features.model';

@Module({
  imports: [SequelizeModule.forFeature([Template, Feature])],
  controllers: [TemplatesController],
  providers: [TemplatesService]
})
export class TemplatesModule {}
