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
const helper_1 = __importDefault(require("../functionHelpers/helper"));
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authToken = req.headers["authorization"];
        const token = authToken && authToken.split(" ")[1];
        const roles = yield Role_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, roles));
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send(helper_1.default.responseData(500, "", error, null));
        }
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleName, active } = req.body;
        const create = yield Role_1.default.create({
            roleName,
            active
        });
        return res.status(201).send({
            status: 201,
            message: "Created",
            data: create
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send(helper_1.default.responseData(500, "Data not found", error, null));
    }
});
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { roleName, active } = req.body;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).send(helper_1.default.responseData(404, "Data not found", null, null));
        }
        role.roleName = roleName;
        role.active = active;
        yield role.save();
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, role));
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            errors: error
        });
    }
});
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null
            });
        }
        yield role.destroy();
        return res.status(200).send({
            status: 200,
            message: "Deleted",
            data: null
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            errors: error
        });
    }
});
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null
            });
        }
        return res.status(200).send({
            status: 200,
            message: "OK",
            data: role
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            errors: error
        });
    }
});
exports.default = { getRole, getRoleById, createRole, updateRole, deleteRole };
