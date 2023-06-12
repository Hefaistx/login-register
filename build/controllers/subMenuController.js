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
const SubMenu_1 = __importDefault(require("../db/models/SubMenu"));
const helper_1 = __importDefault(require("../functionHelpers/helper"));
const createSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const submenu = yield SubMenu_1.default.create({
            name, masterMenuId, url, title, icon, ordering, isTargetSelf,
            active: true
        });
        return res.status(201).send(helper_1.default.responseData(201, "Created", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const getListSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submenu = yield SubMenu_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const getAllSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submenu = yield SubMenu_1.default.findAll();
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const getDetailSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const submenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.responseData(404, "NotFound", null, null));
        }
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const updateSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const submenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.responseData(404, "NotFound", null, null));
        }
        submenu.name = name;
        submenu.masterMenuId = masterMenuId;
        submenu.url = url;
        submenu.title = title;
        submenu.icon = icon;
        submenu.ordering = ordering;
        submenu.isTargetSelf = isTargetSelf;
        yield submenu.save();
        return res.status(200).send(helper_1.default.responseData(200, "Updated", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const softDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const submenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.responseData(404, "NotFound", null, null));
        }
        submenu.active = false;
        yield submenu.save();
        return res.status(200).send(helper_1.default.responseData(200, "Removed", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const permanentDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const submenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.responseData(404, "NotFound", null, null));
        }
        yield submenu.destroy();
        return res.status(200).send(helper_1.default.responseData(200, "Deleted", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
exports.default = {
    createSubmenu,
    getListSubmenu,
    getAllSubmenu,
    getDetailSubmenu,
    updateSubmenu,
    softDelete,
    permanentDelete
};
