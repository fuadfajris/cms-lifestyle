import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  // Ambil semua roles
  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll();
  }

  // Ambil role berdasarkan id
  async findOne(id: number): Promise<Role> {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }
}
