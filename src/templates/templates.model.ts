import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Feature } from '../features/features.model';

@Table({ tableName: 'templates', timestamps: false })
export class Template extends Model<Template> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  thumbnail?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  category?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  url?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description?: string;

  // Relasi: Template punya banyak Feature
  @HasMany(() => Feature)
  features: Feature[];
}
