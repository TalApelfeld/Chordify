import { Request, Response, NextFunction } from "express";
import { Quiz } from "../models/Quiz";

export async function getQuizDays(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dailyPlans = await Quiz.find({});
    res.status(200).json({ status: "success", data: dailyPlans });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "faild", message: error });
  }
}

export async function addDailyPlan(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docs = Quiz.insertMany(req.body);
    res.status(200).json({ status: "success", data: docs });
  } catch (error) {
    res.status(404).json({ status: "faild", message: error });
  }
}

export async function getDailyPlan(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.params.id);
    const plan = await Quiz.findOne({ number: Number(req.params.id) });
    res.status(200).json({ status: "success", data: plan });
  } catch (error) {
    res.status(404).json({ status: "faild", message: error });
  }
}
