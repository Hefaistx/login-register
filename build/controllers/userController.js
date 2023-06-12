"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const helper_1 = __importDefault(require("../functionHelpers/helper"));
const passwordHelper_1 = __importDefault(require("../functionHelpers/passwordHelper"));
const User_1 = __importDefault(require("../db/models/User"));
const Role_1 = __importDefault(require("../db/models/Role"));
const RoleMenuAccess_1 = __importDefault(require("../db/models/RoleMenuAccess"));
const MasterMenu_1 = __importDefault(require("../db/models/MasterMenu"));
const SubMenu_1 = __importDefault(require("../db/models/SubMenu"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, roleId, confirmPassword } = req.body;
        const hash = yield passwordHelper_1.default.passwordHashing(password);
        const user = yield User_1.default.create({
            name,
            email,
            password: hash,
            active: true,
            verified: true,
            roleId: roleId
        });
        if (user.active == true) {
        }
        return res.status(201).send(helper_1.default.responseData(201, "Created.", null, user));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(401).send(helper_1.default.responseData(401, "Unauthorized", null, null));
        }
        const matched = yield passwordHelper_1.default.passwordCompare(password, user.password);
        if (!matched) {
            return res.status(401).send(helper_1.default.responseData(401, "Unauthorized", null, null));
        }
        const dataUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active
        };
        const token = helper_1.default.generateToken(dataUser);
        const refreshToken = helper_1.default.generateRefreshToken(dataUser);
        user.accessToken = refreshToken;
        yield user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const roleAccess = yield RoleMenuAccess_1.default.findAll({
            where: {
                roleId: user.roleId,
                active: true
            }
        });
        const listSubmenuId = roleAccess.map((item) => {
            return item.submenuId;
        });
        const menuAccess = yield MasterMenu_1.default.findAll({
            where: {
                active: true
            },
            order: [
                ['ordering', 'ASC'],
                [SubMenu_1.default, 'ordering', 'ASC']
            ],
            include: {
                model: SubMenu_1.default,
                where: {
                    id: { [sequelize_1.Op.in]: listSubmenuId }
                }
            }
        });
        const responseUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active,
            token: token,
            menuAccess: menuAccess
        };
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, responseUser));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const RefreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!RefreshToken) {
            return res.status(401).send(helper_1.default.responseData(401, "Unauthorized", null, null));
        }
        const decodedUser = helper_1.default.extractRefreshToken(RefreshToken);
        console.log(decodedUser);
        if (!decodedUser) {
            return res.status(401).send(helper_1.default.responseData(401, "Unauthorized", null, null));
        }
        const token = helper_1.default.generateToken({
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active
        });
        const resultUser = {
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
            token: token
        };
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, resultUser));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const userDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = res.locals.userEmail;
        const user = yield User_1.default.findOne({
            where: {
                email: email
            },
            include: {
                model: Role_1.default,
                attributes: ["id", "roleName"]
            }
        });
        if (!user) {
            return res.status(404).send(helper_1.default.responseData(404, "User not found", null, null));
        }
        user.password = "";
        user.accessToken = "";
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, user));
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const userUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { password, name, email } = req.body;
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            return res.status(404).send(helper_1.default.responseData(404, "User not Found", null, null));
        }
        if (password) {
            const hashedPassword = yield passwordHelper_1.default.passwordHashing(password);
            user.password = hashedPassword;
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        yield user.save();
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, null));
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send(helper_1.default.responseData(500, "", error, null));
        }
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
        if (!refreshToken) {
            return res.status(200).send(helper_1.default.responseData(200, "User logged out", null, null));
        }
        const email = res.locals.userEmail;
        const user = yield User_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            res.clearCookie("refreshToken");
            return res.status(200).send(helper_1.default.responseData(200, "User logged out", null, null));
        }
        yield user.update({ accessToken: null }, { where: { email: email } });
        res.clearCookie("refreshToken");
        return res.status(200).send(helper_1.default.responseData(200, "User logged out", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
exports.default = { Register, userLogin, refreshToken, userDetail, userUpdate, userLogout };
