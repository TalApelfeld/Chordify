"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testControllers_1 = require("../controllers/testControllers");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/", testControllers_1.createDoc);
// "protect" willl be first
router.get("/", authController_1.protect, testControllers_1.findDoc);
router.get("/flight-stats", testControllers_1.getFlightStats);
router.patch("/:id", testControllers_1.updateDoc);
router.delete("/:id", testControllers_1.deleteDoc);
exports.default = router;
