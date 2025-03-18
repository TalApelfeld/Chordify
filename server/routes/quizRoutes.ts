import express from "express";
import {
  addDailyPlan,
  getDailyPlan,
  getQuizDays,
} from "../controllers/quizController";

export const quizRouter = express.Router();

quizRouter.get("/", getQuizDays).post("/", addDailyPlan);
quizRouter.get("/:id", getDailyPlan);
