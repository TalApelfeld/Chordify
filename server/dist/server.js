"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: "../config.env" });
const dataBaseString = process.env.DB_STRING;
const port = process.env.PORT;
mongoose_1.default.connect(dataBaseString).then(() => {
    console.log("DB connected successfully");
    app_1.default.listen(port, () => {
        console.log("Server running on port: " + port);
    });
});
