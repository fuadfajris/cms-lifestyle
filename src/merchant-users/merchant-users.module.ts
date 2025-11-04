import { Module } from '@nestjs/common';
import { MerchantUsersController } from './merchant-users.controller';
import { MerchantUsersService } from './merchant-users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MerchantUser } from './merchant-users.model';
import { Role } from '../roles/roles.model';
import { Merchant } from '../merchants/merchant.model';

@Module({
  imports: [SequelizeModule.forFeature([MerchantUser, Role, Merchant])],
  controllers: [MerchantUsersController],
  providers: [MerchantUsersService]
})
export class MerchantUsersModule {}
