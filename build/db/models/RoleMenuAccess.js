"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../../config/dbConnection"));
const Role_1 = __importDefault(require("./Role"));
const SubMenu_1 = __importDefault(require("./SubMenu"));
class RoleMenuAccess extends sequelize_1.Model {
}
RoleMenuAccess.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    roleId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    submenuId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
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
RoleMenuAccess.belongsTo(SubMenu_1.default, {
    foreignKey: 'submenuId'
});
RoleMenuAccess.belongsTo(Role_1.default, {
    foreignKey: 'roleId'
});
exports.default = RoleMenuAccess;
