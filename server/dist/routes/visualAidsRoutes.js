"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visualAidsControllers_1 = require("../controllers/visualAidsControllers");
const router = express_1.default.Router();
router.post("/", visualAidsControllers_1.createChord);
router.get("/", visualAidsControllers_1.getChords);
exports.default = router;
