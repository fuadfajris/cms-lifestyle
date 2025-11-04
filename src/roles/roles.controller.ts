import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async getRoleById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }
}
