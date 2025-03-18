"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRouter = void 0;
const express_1 = __importDefault(require("express"));
const quizController_1 = require("../controllers/quizController");
exports.quizRouter = express_1.default.Router();
exports.quizRouter.get("/", quizController_1.getQuizDays).post("/", quizController_1.addDailyPlan);
exports.quizRouter.get("/:id", quizController_1.getDailyPlan);
