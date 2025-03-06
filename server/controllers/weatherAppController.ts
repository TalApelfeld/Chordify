import { Request, Response, NextFunction } from "express";
import { City } from "../models/weatherApp/City";

export async function getCities(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cities = await City.find({});
  res.status(200).json({ status: "success", cities });
}
