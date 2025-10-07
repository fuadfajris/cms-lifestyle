import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Merchant } from './merchant.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectModel(Merchant) private readonly merchantModel: typeof Merchant,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: {} }> {
    const user = await this.merchantModel.findOne({ where: { email } });
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

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }

  async findMerchant(merchantId: number): Promise<Merchant> {
    const merchant = await this.merchantModel.findByPk(merchantId);

    if (!merchant) {
      throw new NotFoundException(`Merchant with id ${merchantId} not found`);
    }

    return merchant;
  }

  async updateMerchantProfile(
    merchantId: number,
    body: { name?: string; email?: string; password?: string; logo?: string },
  ): Promise<Merchant> {
    const merchant = await this.merchantModel.findByPk(merchantId);

    if (!merchant) {
      throw new NotFoundException(`Merchant with id ${merchantId} not found`);
    }

    const updates: Partial<Merchant> = { ...body };
    if (body.password) {
      updates.password = await bcrypt.hash(body.password, 12);
    }

    await merchant.update(updates);

    return merchant;
  }
}
