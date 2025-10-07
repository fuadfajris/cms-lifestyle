import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Template } from './templates.model';
import { Feature } from '../features/features.model';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template)
    private templateModel: typeof Template,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateModel.findAll({
      include: [{
        model: Feature,
        attributes: ['feature_name']
      }],
      order: [['id', 'ASC']],
    });
  }
}
