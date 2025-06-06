"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
console.log(process.env);
const dataBaseString = process.env.DB_STRING;
const port = Number(process.env.PORT) || 3000;
// const options = {
//   key: fs.readFileSync("./server.key"),
//   cert: fs.readFileSync("./server.cert"),
// };
mongoose_1.default.connect(dataBaseString).then(() => {
    console.log("DB connected successfully");
    app_1.default.listen(port, "0.0.0.0", () => {
        if (process.env.NODE_ENV === "development")
            console.log(`Http Server running in ${process.env.NODE_ENV} on port: ` + port);
        if (process.env.NODE_ENV === "production")
            console.log(`Https Server running in ${process.env.NODE_ENV} on port: ` + port);
    });
});
