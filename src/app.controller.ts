import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize';
import { InjectConnection } from '@nestjs/sequelize';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private sequelize: Sequelize,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-check')
  async healthCheck() {
    try {
      await this.sequelize.authenticate();
      const [results, metadata] = await this.sequelize.query('SELECT * FROM "users" LIMIT 1;');
      return { status: 'ok', message: 'DB connected!', data: results };
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }
}
