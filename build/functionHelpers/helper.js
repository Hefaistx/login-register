"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const responseData = (status, message, error, data) => {
    if (error != null && error instanceof Error) {
        const response = {
            status: status,
            message: message,
            errors: error,
            data: null
        };
        return response;
    }
    const res = {
        status,
        message,
        errors: error,
        data: data,
    };
    return res;
};
const generateToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_TOKEN, { expiresIn: "1h" });
    return token;
};
const generateRefreshToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1d" });
    return token;
};
const extractToken = (token) => {
    const secretKey = process.env.JWT_TOKEN;
    let resData;
    const res = jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            resData = null;
        }
        else {
            resData = decoded;
        }
    });
    if (resData) {
        const result = (resData);
        return result;
    }
    return null;
};
const extractRefreshToken = (token) => {
    const secretKey = process.env.JWT_REFRESH_TOKEN;
    let resData;
    const res = jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            resData = null;
        }
        else {
            resData = decoded;
        }
    });
    if (resData) {
        const result = (resData);
        return result;
    }
    return null;
};
exports.default = { responseData, generateToken, generateRefreshToken, extractToken, extractRefreshToken };
