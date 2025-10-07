import { Controller, Get } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private featureService: FeaturesService) {}

  @Get()
  async getAllFeatures() {
    const feature = await this.featureService.findAll();
    return { data: feature };
  }
}
