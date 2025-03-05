"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songsControllers_1 = require("../controllers/songsControllers");
const authController_1 = require("../controllers/authController");
const songsRouter = express_1.default.Router();
songsRouter.route("/begginer").get(songsControllers_1.getBegginerSongs);
songsRouter.route("/newSearch").post(authController_1.checkCookie, songsControllers_1.getNewSong);
songsRouter.route("/searched").get(authController_1.checkCookie, songsControllers_1.getSearchedSongs);
songsRouter.route("/").post(authController_1.protect, songsControllers_1.fetchSong);
exports.default = songsRouter;
