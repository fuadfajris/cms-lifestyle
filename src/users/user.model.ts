import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  email: string;
  name?: string;
  password?: string;
}

// ini penting -> biar Sequelize tau field mana yg optional saat create/upsert
export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string;
}
