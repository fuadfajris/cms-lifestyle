import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MerchantUser } from '../merchant-users/merchant-users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Merchant } from '../merchants/merchant.model';
import { Role } from '../roles/roles.model';

@Injectable()
export class MerchantUsersService {
  constructor(
    @InjectModel(MerchantUser)
    private readonly merchantUserModel: typeof MerchantUser,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.merchantUserModel.findOne({
      where: { email },
      include: [Role],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credential');
    }

    const payload = { sub: user.id, email: user.email };
    const userResponse = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
      merchant_id: user.dataValues.merchant_id,
      logo: user.dataValues.logo,
      role: user.dataValues.role.dataValues.role_name ?? 'unknown',
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userResponse,
    };
  }

  async findMerchant(merchantUsersId: number): Promise<MerchantUser> {
    const merchant = await this.merchantUserModel.findByPk(merchantUsersId, {
      include: [
        { model: Merchant, as: 'merchant', attributes: ['name', 'email'] },
        { model: Role, as: 'role', attributes: ['role_name', 'role_label'] },
      ],
    });

    if (!merchant) {
      throw new NotFoundException(
        `Merchant user with id ${merchantUsersId} not found`,
      );
    }

    return merchant;
  }

  async updateMerchantProfile(
    merchantId: number,
    body: { name?: string; email?: string; password?: string; logo?: string },
  ): Promise<MerchantUser> {
    const merchant = await this.merchantUserModel.findByPk(merchantId);

    if (!merchant) {
      throw new NotFoundException(`Merchant with id ${merchantId} not found`);
    }

    const updates: Partial<MerchantUser> = { ...body };
    if (body.password) {
      updates.password = await bcrypt.hash(body.password, 12);
    }

    await merchant.update(updates);

    return merchant;
  }
}
