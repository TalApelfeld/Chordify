import express from "express";
import {
  fetchSong,
  getBegginerSongs,
  getNewSong,
  getSearchedSongs,
} from "../controllers/songsControllers";
import { checkCookie, protect } from "../controllers/authController";

const songsRouter = express.Router();

songsRouter.route("/begginer").get(getBegginerSongs);
songsRouter.route("/newSearch").post(checkCookie, getNewSong);
songsRouter.route("/searched").get(checkCookie, getSearchedSongs);
songsRouter.route("/").post(protect, fetchSong);

export default songsRouter;
