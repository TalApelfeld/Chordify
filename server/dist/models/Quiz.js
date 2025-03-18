"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dailyQuestionsSchema = new mongoose_1.default.Schema({
    question: String,
    answers: [String],
    correctAnswer: Number,
    explanation: String,
});
const quizSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    questions: [dailyQuestionsSchema],
});
exports.Quiz = mongoose_1.default.model("Daily Plan", quizSchema);
