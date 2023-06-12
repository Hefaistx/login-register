"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../../config/dbConnection"));
const User_1 = __importDefault(require("./User"));
class UserIntake extends sequelize_1.Model {
}
UserIntake.init({
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    day: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    carbohydrates: {
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0
    },
    sugar: {
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0
    },
    proteins: {
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0
    },
    fat: {
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0
    },
    userId: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    timestamps: true,
    sequelize: dbConnection_1.default,
    underscored: false
});
UserIntake.beforeCreate((userIntake, _) => {
    userIntake.day = new Date(); // Mengatur nilai "day" dengan nilai "createdAt"
});
UserIntake.belongsTo(User_1.default, {
    foreignKey: 'id'
});
exports.default = UserIntake;
