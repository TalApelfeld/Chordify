import { Request, Response, NextFunction } from "express";

export default async function searchTest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json({ message: "hello from backend" });
  } catch (error) {
    res.json(error);
  }
}
