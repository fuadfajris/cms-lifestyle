import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('upsert')
  async upsert(@Body() body: any) {
    console.log("masoooooookkkk <<<<<<<<<<<<<<<<<<<<<<<<<<<<<", body);
    
    return this.usersService.upsertUser(body);
  }
}
