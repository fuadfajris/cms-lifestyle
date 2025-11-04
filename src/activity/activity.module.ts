import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Activity } from './activity.model';
import { Merchant } from 'src/merchants/merchant.model';

@Module({
  imports: [SequelizeModule.forFeature([Activity, Merchant])],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
