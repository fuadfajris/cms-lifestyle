// src/facilities/facilities.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Facility } from './facilities.model';
import { Event } from '../events/events/event.model';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';

@Module({
  imports: [SequelizeModule.forFeature([Facility, Event])],
  providers: [FacilitiesService],
  controllers: [FacilitiesController],
})
export class FacilitiesModule {}
