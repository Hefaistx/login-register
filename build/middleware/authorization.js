"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("../functionHelpers/helper"));
const authenticated = (req, res, next) => {
    try {
        const authToken = req.headers["authorization"];
        const token = authToken && authToken.split(" ")[1];
        if (token === null) {
            return res.status(401).send(helper_1.default.responseData(401, "Unauthorized", null, null));
        }
        const result = helper_1.default.extractToken(token);
        if (!result) {
            return res.status(401).send(helper_1.default.responseData(401, "Unauthorized", null, null));
        }
        res.locals.userEmail = result === null || result === void 0 ? void 0 : result.email;
        res.locals.roleId = result === null || result === void 0 ? void 0 : result.roleId;
        next();
    }
    catch (err) {
        return res.status(500).send(helper_1.default.responseData(500, "", err, null));
    }
};
const superUser = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 6) {
            return res.status(401).send(helper_1.default.responseData(403, "Access Forbidden", null, null));
        }
        next();
    }
    catch (err) {
        return res.status(500).send(helper_1.default.responseData(500, "", err, null));
    }
};
const basicAdmin = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 2) {
            return res.status(401).send(helper_1.default.responseData(403, "Access Forbidden", null, null));
        }
        next();
    }
    catch (err) {
        console.log(Error);
        return res.status(500).send(helper_1.default.responseData(500, "", err, null));
    }
};
const basicUser = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 3) {
            return res.status(401).send(helper_1.default.responseData(403, "Access Forbidden", null, null));
        }
        next();
    }
    catch (err) {
        return res.status(500).send(helper_1.default.responseData(500, "", err, null));
    }
};
exports.default = { authenticated, superUser, basicAdmin, basicUser };
