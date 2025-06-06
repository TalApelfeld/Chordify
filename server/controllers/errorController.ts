import { Request, Response, NextFunction } from "express";

export function globalErrorHndler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(Number(err.statusCode)).json({
    status: err.status,
    message: err.message,
  });
}
