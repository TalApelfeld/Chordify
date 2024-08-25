"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songsControllers_1 = require("../controllers/songsControllers");
const authController_1 = require("../controllers/authController");
const songsRouter = express_1.default.Router();
songsRouter.route("/searched").get(authController_1.protect, songsControllers_1.getSearchedSongs);
songsRouter.route("/begginer").get(authController_1.protect, songsControllers_1.getBegginerSongs);
//* add protect
songsRouter.route("/").post(authController_1.protect, songsControllers_1.fetchSong);
exports.default = songsRouter;
