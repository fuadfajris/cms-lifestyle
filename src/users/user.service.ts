import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationAttributes } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async upsertUser(userData: UserCreationAttributes): Promise<User> {
    const [user] = await this.userModel.upsert(userData, {
      returning: true,
      conflictFields: ['email'],
    });
    return user;
  }
}
