import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Template } from '../templates/templates.model';

@Table({ tableName: 'features', timestamps: false })
export class Feature extends Model<Feature> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Template)
  @Column({ type: DataType.INTEGER, allowNull: false })
  template_id: number;

  @BelongsTo(() => Template)
  template: Template;

  @Column({ type: DataType.TEXT, allowNull: false })
  feature_name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  feature_key: string;
}
