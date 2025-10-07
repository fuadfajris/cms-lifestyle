import { Module } from '@nestjs/common';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';
import { Merchant } from './merchant.model';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from '../common/guard/auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Merchant]),
    JwtModule.register({
      global: true,
      secret: 'secretKeys123',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [MerchantsController],
  providers: [MerchantsService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [MerchantsService],
})
export class MerchantsModule {}
