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
const UserIntake_1 = __importDefault(require("../db/models/UserIntake"));
const User_1 = __importDefault(require("../db/models/User"));
const createUserIntake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, carbohydrates, sugar, proteins, fat } = req.body;
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).send(helper_1.default.responseData(404, "User not found.", null, null));
        }
        const userIntake = yield UserIntake_1.default.create({
            userId,
            carbohydrates,
            sugar,
            proteins,
            fat,
        });
        return res.status(200).send(helper_1.default.responseData(200, "Created", userIntake, null));
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(helper_1.default.responseData(500, "Internal server error", null, null));
    }
});
const updateUserIntake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { carbohydrates, sugar, proteins, fat } = req.body;
        const userIntake = yield UserIntake_1.default.findByPk(id);
        if (!userIntake) {
            return res.status(404).send(helper_1.default.responseData(404, "Data not found", null, null));
        }
        userIntake.carbohydrates = carbohydrates;
        userIntake.sugar = sugar;
        userIntake.proteins = proteins;
        userIntake.fat = fat;
        yield userIntake.save();
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, userIntake));
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send(helper_1.default.responseData(500, "", error, null));
        }
        ;
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
const getUserIntakeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userIntake = yield UserIntake_1.default.findByPk(id);
        if (!userIntake) {
            return res.status(404).send(helper_1.default.responseData(404, "User not found.", null, null));
        }
        return res.status(200).send(helper_1.default.responseData(200, "OK", userIntake, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.responseData(500, "Internal server error.", null, null));
    }
});
const getUserIntakeByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userIntakes = yield UserIntake_1.default.findAll({
            where: {
                userId: userId
            }
        });
        return res.status(200).send(helper_1.default.responseData(200, "OK", null, userIntakes));
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send(helper_1.default.responseData(500, "", error, null));
        }
        return res.status(500).send(helper_1.default.responseData(500, "", error, null));
    }
});
exports.default = { createUserIntake, getUserIntakeByUserId, updateUserIntake, getUserIntakeById };
