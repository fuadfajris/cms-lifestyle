import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feature } from './features.model';

@Module({
  imports: [SequelizeModule.forFeature([Feature])],
  controllers: [FeaturesController],
  providers: [FeaturesService]
})
export class FeaturesModule {}
