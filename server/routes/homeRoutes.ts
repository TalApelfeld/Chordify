import express from "express";
import {
  getLearningPlanFromGPT,
  getPlanFromDB,
} from "../controllers/homeControllers";
import { checkCookie } from "../controllers/authController";

const router = express.Router();

router
  .post("/learningplan", checkCookie, getLearningPlanFromGPT)
  .get("/learningplan", checkCookie, getPlanFromDB);

export default router;
