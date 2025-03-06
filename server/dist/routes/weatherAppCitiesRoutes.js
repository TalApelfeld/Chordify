"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherAppController_1 = require("../controllers/weatherAppController");
const cityRouter = express_1.default.Router();
cityRouter.get("/", weatherAppController_1.getCities);
exports.default = cityRouter;
