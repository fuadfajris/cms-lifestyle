import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feature } from './features.model';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectModel(Feature)
    private templateModel: typeof Feature,
  ) {}

  async findAll(): Promise<Feature[]> {
    return this.templateModel.findAll({
      order: [['id', 'ASC']],
    });
  }
}
