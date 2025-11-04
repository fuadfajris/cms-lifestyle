import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorators';
import { MerchantUsersService } from './merchant-users.service';

@Controller('merchant-users')
export class MerchantUsersController {
  constructor(private merchantUsersService: MerchantUsersService) {}

  @Public()
  @Post('login')
  loginMerchant(@Body() loginDto: Record<string, string>) {
    return this.merchantUsersService.login(loginDto.email, loginDto.password);
  }

  @Get()
  async getProfileMerchant(@Query('merchantUsersId') merchantUsersId: number) {
    const merchant = await this.merchantUsersService.findMerchant(merchantUsersId);

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
    const updatedMerchant = await this.merchantUsersService.updateMerchantProfile(
      merchantId,
      body,
    );
    return updatedMerchant;
  }
}
