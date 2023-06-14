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
    },
    dayOfWeek: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
    sequelize: dbConnection_1.default,
    underscored: false,
    modelName: 'UserIntake',
});
UserIntake.beforeValidate((userIntake, _) => {
    userIntake.day = userIntake.createdAt;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[userIntake.day.getDay()];
    userIntake.dayOfWeek = dayOfWeek;
});
User_1.default.hasMany(UserIntake);
UserIntake.belongsTo(User_1.default, {
    foreignKey: 'userId'
});
exports.default = UserIntake;
