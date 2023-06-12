"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../../config/dbConnection"));
class subMenu extends sequelize_1.Model {
}
subMenu.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    name: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    masterMenuId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    url: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    title: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    icon: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    ordering: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    isTargetSelf: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    active: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    timestamps: true,
    sequelize: dbConnection_1.default,
    underscored: false
});
exports.default = subMenu;
