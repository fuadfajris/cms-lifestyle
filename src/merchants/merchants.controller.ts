import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { Public } from '../common/decorators/public.decorators';
import { Merchant } from './merchant.model';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Public()
  @Post('login')
  loginMerchant(@Body() loginDto: Record<string, string>) {
    return this.merchantsService.login(loginDto.email, loginDto.password);
  }

  @Get(':merchantId')
  async getProfileMerchant(
    @Param('merchantId', ParseIntPipe) merchantId: number,
  ): Promise<Merchant | { message: string }> {
    const merchant = await this.merchantsService.findMerchant(merchantId);

    if (!merchant) {
      return { message: 'No merchant found' };
    }

    return merchant;
  }

  @Put(':merchantId')
  async updateProfile(
    @Param('merchantId', ParseIntPipe) merchantId: number,
    @Body()
    body: { name?: string; email?: string; password?: string; logo?: string },
  ) {
    const updatedMerchant = await this.merchantsService.updateMerchantProfile(
      merchantId,
      body,
    );
    return updatedMerchant;
  }
}
