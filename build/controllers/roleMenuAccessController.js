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
const Role_1 = __importDefault(require("../db/models/Role"));
const RoleMenuAccess_1 = __importDefault(require("../db/models/RoleMenuAccess"));
const SubMenu_1 = __importDefault(require("../db/models/SubMenu"));
const helper_1 = __importDefault(require("../functionHelpers/helper"));
const createAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId, submenuId } = req.body;
        const access = yield RoleMenuAccess_1.default.create({
            roleId, submenuId,
            active: true
        });
        return res.status(201).send(helper_1.default.responseData(201, "Created", null, access));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const getList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield RoleMenuAccess_1.default.findAll({
            where: {
                active: true,
            },
            include: [
                {
                    model: SubMenu_1.default,
                    attributes: ['name']
                },
                {
                    model: Role_1.default,
                    attributes: ['roleName']
                }
            ]
        });
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield RoleMenuAccess_1.default.findAll({
            include: [
                {
                    model: SubMenu_1.default,
                    attributes: ['name']
                },
                {
                    model: Role_1.default,
                    attributes: ['roleName']
                }
            ]
        });
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const getDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield RoleMenuAccess_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(helper_1.default.responseData(404, "NotFound", null, null));
        }
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const updateAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { roleId, submenuId } = req.body;
        const menu = yield RoleMenuAccess_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(helper_1.default.responseData(404, "NotFound", null, null));
        }
        menu.roleId = roleId;
        menu.submenuId = submenuId;
        yield menu.save();
        return res.status(200).send(helper_1.default.responseData(200, "Updated", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const softDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield RoleMenuAccess_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(helper_1.default.responseData(404, "NotFound", null, null));
        }
        menu.active = false;
        yield menu.save();
        return res.status(200).send(helper_1.default.responseData(200, "Updated", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
exports.default = {
    createAccess,
    getAll,
    getList,
    getDetail,
    updateAccess,
    softDelete
};
