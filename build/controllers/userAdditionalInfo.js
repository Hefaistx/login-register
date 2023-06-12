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
const helper_1 = __importDefault(require("../functionHelpers/helper"));
const User_1 = __importDefault(require("../db/models/User"));
const updateUserAdditionalInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { age, weight, height } = req.body;
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            return res.status(404).send(helper_1.default.responseData(404, "User not found", null, null));
        }
        if (age) {
            user.age = age;
        }
        if (weight) {
            user.weight = weight;
        }
        if (height) {
            user.height = height;
        }
        yield user.save();
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, user));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
exports.default = updateUserAdditionalInfo;
