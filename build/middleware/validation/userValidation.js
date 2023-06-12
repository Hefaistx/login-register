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
const User_1 = __importDefault(require("../../db/models/User"));
const registerValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const data = {
            name,
            email,
            password,
            confirmPassword
        };
        const rules = {
            "name": "required|string|max:50",
            "email": "required|email",
            "password": "required|min:8",
            "confirmPassword": "required|same:password"
        };
        const validate = new validatorjs_1.default(data, rules);
        if (validate.fails()) {
            return res.status(400).send(helper_1.default.responseData(400, "Bad Request", validate.errors, null));
        }
        const user = yield User_1.default.findOne({
            where: {
                email: data.email
            }
        });
        if (user) {
            const errorData = {
                errors: {
                    email: [
                        "Email is already used by someone"
                    ]
                }
            };
            return res.status(400).send(helper_1.default.responseData(400, "BadRequest", errorData, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
exports.default = { registerValidation };
