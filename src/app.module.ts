import { Module } from '@nestjs/common';
import { InjectConnection, SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { EventsModule } from './events/events/events.module';
import { GuestsModule } from './guests/guests.modul';
import { FacilitiesModule } from './facilities/facilities.modul';
import { TicketsModule } from './tickets/ticket.modul';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/user.modul';
import { OrderTransactionsModule } from './order-transaction/order-transactions.module';
import { TicketDetailModule } from './tickets/ticket-detail/ticket-detail.module';
import { MerchantsModule } from './merchants/merchants.module';
import { TemplatesModule } from './templates/templates.module';
import { FeaturesModule } from './features/features.module';
import { CheckinModule } from './checkin/checkin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // biar ga perlu import ConfigModule di module lain
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadModels: true,
        synchronize: true, // hati2 di prod
      }),
    }),
    EventsModule,
    GuestsModule,
    FacilitiesModule,
    TicketsModule,
    UsersModule,
    OrderTransactionsModule,
    TicketDetailModule,
    MerchantsModule,
    TemplatesModule,
    FeaturesModule,
    CheckinModule
  ],
})
export class AppModule {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connected successfully!');
    } catch (err) {
      console.error('❌ Database connection failed:', err.message);
    }
  }
}
