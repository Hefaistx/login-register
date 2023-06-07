import { DataTypes, HasMany, Model, Optional, Sequelize } from "sequelize";
import connection from "../../config/dbConnection";
import subMenu from "./SubMenu";

interface masterMenuAttributes {
  id?: number,
  name?: string | null,
  icon?: string | null,
  ordering?: number | null,
  active?: boolean | null,

  createdAt?: Date,
  updatedAt? : Date
}

export interface masterMenuInput extends Optional<masterMenuAttributes, 'id'>{ }
export interface masterMenuOutput extends Required<masterMenuAttributes>{ }

class MasterMenu extends Model<masterMenuAttributes, masterMenuInput> implements masterMenuAttributes {
  public id!: number;
  public name!: string;
  public icon!: string;
  public ordering!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

MasterMenu.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  icon: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  ordering: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});
MasterMenu.hasMany(subMenu);


export default MasterMenu;