import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import User from "./User";

interface FoodAttributes {
  id?: number,
  name?: string | null,
  carbohydrates?: number | null,
  sugar?: number | null,
  proteins?: number | null,
  fat?: number | null,
  note?: string | null,
  userId?: number,

  createdAt?: Date,
  updatedAt? : Date
}

export interface FoodInput extends Optional<FoodAttributes, 'id'>{ }
export interface FoodOutput extends Required<FoodAttributes>{ }

class Food extends Model<FoodAttributes, FoodInput> implements FoodAttributes {
  public id!: number;
  public name!: string;
  public carbohydrates!: number;
  public sugar!: number;
  public proteins!: number;
  public fat!: number;
  public note!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

Food.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  name: {
    type: DataTypes.STRING
  },
  carbohydrates: {
    type: DataTypes.NUMBER
  },
  sugar: {
    type: DataTypes.NUMBER
  },
  fat: {
    type: DataTypes.NUMBER
  },
  note: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.NUMBER
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default Food;