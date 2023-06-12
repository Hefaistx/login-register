import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import User from "./User";
import Sequelize from "sequelize";

interface UserIntakeAttributes {
  id?: number,
  carbohydrates?: number | null,
  sugar?: number | null,
  proteins?: number | null,
  fat?: number | null,
  day?: Date,
  userId?: number,
  dayOfWeek?: string;

  createdAt?: Date,
  updatedAt? : Date
}

export interface UserIntakeInput extends Optional<UserIntakeAttributes, 'id'>{ }
export interface UserIntakeOutput extends Required<UserIntakeAttributes>{ }

class UserIntake extends Model<UserIntakeAttributes, UserIntakeInput> implements UserIntakeAttributes {
  public id!: number;
  public day!: Date;
  public carbohydrates!: number;
  public sugar!: number;
  public proteins!: number;
  public fat!: number;
  public userId!: number;
  public dayOfWeek?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

UserIntake.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT
  },
  day:{
    allowNull: false,
    type: DataTypes.DATE
  },
  carbohydrates: {
    allowNull: true,
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  sugar: {
    allowNull: true,
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  proteins: {
    allowNull: true,
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  fat: {
    allowNull: true,
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  userId:{
    type: DataTypes.NUMBER
  },
  dayOfWeek:{
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'UserIntake',
});


  UserIntake.beforeValidate((userIntake, _) => {
    userIntake.day = userIntake.createdAt;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[userIntake.day.getDay()];
  
    userIntake.dayOfWeek = dayOfWeek;
  });

User.hasMany(UserIntake);
UserIntake.belongsTo(User, {
  foreignKey: 'userId'
});

export default UserIntake;