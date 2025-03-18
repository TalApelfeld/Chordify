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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuizDays = getQuizDays;
exports.addDailyPlan = addDailyPlan;
exports.getDailyPlan = getDailyPlan;
const Quiz_1 = require("../models/Quiz");
function getQuizDays(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dailyPlans = yield Quiz_1.Quiz.find({});
            res.status(200).json({ status: "success", data: dailyPlans });
        }
        catch (error) {
            console.log(error);
            res.status(404).json({ status: "faild", message: error });
        }
    });
}
function addDailyPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = Quiz_1.Quiz.insertMany(req.body);
            res.status(200).json({ status: "success", data: docs });
        }
        catch (error) {
            res.status(404).json({ status: "faild", message: error });
        }
    });
}
function getDailyPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.id);
            const plan = yield Quiz_1.Quiz.findOne({ number: Number(req.params.id) });
            res.status(200).json({ status: "success", data: plan });
        }
        catch (error) {
            res.status(404).json({ status: "faild", message: error });
        }
    });
}
