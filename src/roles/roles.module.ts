import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { MerchantUser } from '../merchant-users/merchant-users.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, MerchantUser])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
