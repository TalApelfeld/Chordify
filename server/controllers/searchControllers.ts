import { Request, Response, NextFunction } from "express";
import User from "../models/Users";

export default async function searchTest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await User.create({ name: "tal test" });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}
