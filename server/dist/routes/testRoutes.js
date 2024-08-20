"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testControllers_1 = require("../controllers/testControllers");
const router = express_1.default.Router();
// router.post("/", createDoc);
// // "protect" willl be first
// router.get("/", protect, findDoc);
// router.get("/flight-stats", getFlightStats);
// router.patch("/:id", updateDoc);
// router.delete("/:id", deleteDoc);
router.get("/", testControllers_1.getKitten);
router.post("/", testControllers_1.createKitten);
exports.default = router;
