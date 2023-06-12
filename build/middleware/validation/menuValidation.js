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
const validatorjs_1 = __importDefault(require("validatorjs"));
const helper_1 = __importDefault(require("../../functionHelpers/helper"));
const MasterMenu_1 = __importDefault(require("../../db/models/MasterMenu"));
const Role_1 = __importDefault(require("../../db/models/Role"));
const SubMenu_1 = __importDefault(require("../../db/models/SubMenu"));
const createMenuValidation = (req, res, next) => {
    try {
        const { name, icon, ordering } = req.body;
        const data = {
            name, icon, ordering
        };
        const rules = {
            "name": "required|string|max:50",
            "icon": "required|string",
            "ordering": "required|numeric",
        };
        const validate = new validatorjs_1.default(data, rules);
        if (validate.fails()) {
            return res.status(400).send(helper_1.default.responseData(400, "Bad Request", validate.errors, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
};
const createSubmenuValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const data = {
            name, masterMenuId, url, title, icon, ordering, isTargetSelf
        };
        const rules = {
            "name": "required|string|max:50",
            "masterMenuId": "required|numeric",
            "url": "required|string",
            "title": "required|string|max:50",
            "icon": "required|string",
            "ordering": "required|numeric",
            "isTargetSelf": "required|boolean"
        };
        const validate = new validatorjs_1.default(data, rules);
        if (validate.fails()) {
            return res.status(400).send(helper_1.default.responseData(400, "Bad Request", validate.errors, null));
        }
        const menu = yield MasterMenu_1.default.findOne({
            where: {
                id: masterMenuId,
                active: true
            }
        });
        if (!menu) {
            const errorData = {
                errors: {
                    masterMenuId: [
                        "Master menu not found"
                    ]
                }
            };
            return res.status(400).send(helper_1.default.responseData(400, "Bad Request", errorData, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const createRoleMenuAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId, submenuId } = req.body;
        const data = {
            roleId, submenuId
        };
        const rules = {
            "roleId": "required|numeric",
            "submenuId": "required|numeric",
        };
        const validate = new validatorjs_1.default(data, rules);
        if (validate.fails()) {
            return res.status(400).send(helper_1.default.responseData(400, "Bad Request", validate.errors, null));
        }
        const role = yield Role_1.default.findOne({
            where: {
                id: roleId,
                active: true
            }
        });
        if (!role) {
            const errorData = {
                errors: {
                    roleId: [
                        "Role not found"
                    ]
                }
            };
            return res.status(400).send(helper_1.default.responseData(400, "Bad Request", errorData, null));
        }
        const submenu = yield SubMenu_1.default.findOne({
            where: {
                id: submenuId,
                active: true
            }
        });
        if (!submenu) {
            const errorData = {
                errors: {
                    submenuId: [
                        "Submenu not found"
                    ]
                }
            };
            return res.status(400).send(helper_1.default.responseData(400, "Bad Request", errorData, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
exports.default = { createMenuValidation, createSubmenuValidation, createRoleMenuAccess };
