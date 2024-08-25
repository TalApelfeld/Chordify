import express from "express";
import {
  fetchSong,
  getBegginerSongs,
  getSearchedSongs,
} from "../controllers/songsControllers";
import { protect } from "../controllers/authController";

const songsRouter = express.Router();

songsRouter.route("/searched").get(protect, getSearchedSongs);
songsRouter.route("/begginer").get(protect, getBegginerSongs);
songsRouter.route("/").post(fetchSong);

export default songsRouter;
