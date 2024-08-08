"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dataBase = "mongodb+srv://talapelfeld:tal2285903@chordifydb.98cezsi.mongodb.net/chordify?retryWrites=true&w=majority&appName=chordifyDB";
const port = 3000;
mongoose_1.default.connect(dataBase).then(() => {
    console.log("DB connected successfully");
    app_1.default.listen(port, () => {
        console.log("Server running on port: " + port);
    });
});
