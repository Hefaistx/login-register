"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../../config/dbConnection"));
class Food extends sequelize_1.Model {
}
Food.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    carbohydrates: {
        type: sequelize_1.DataTypes.NUMBER
    },
    sugar: {
        type: sequelize_1.DataTypes.NUMBER
    },
    fat: {
        type: sequelize_1.DataTypes.NUMBER
    },
    note: {
        type: sequelize_1.DataTypes.STRING
    },
    userId: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    timestamps: true,
    sequelize: dbConnection_1.default,
    underscored: false
});
exports.default = Food;
