"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
let APP_NAME = process.env.APP_NAME;
let APP_PORT = process.env.APP_PORT;
app.get("/", (req, res) => {
    return res.status(200).send({
        response: "Express Typescript"
    });
});
app.use(Routes_1.default);
app.use((0, cors_1.default)({
    credentials: true,
    origin: true
}));
app.listen(process.env.APP_PORT || 8080, () => {
    console.log(console.log(`${APP_NAME} running on ${APP_PORT}`));
});
