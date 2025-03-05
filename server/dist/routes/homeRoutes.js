"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeControllers_1 = require("../controllers/homeControllers");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router
    .post("/learningplan", authController_1.checkCookie, homeControllers_1.getLearningPlanFromGPT)
    .get("/learningplan", authController_1.checkCookie, homeControllers_1.getPlanFromDB);
exports.default = router;
