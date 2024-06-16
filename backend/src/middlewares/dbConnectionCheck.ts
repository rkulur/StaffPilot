import { Request, Response, NextFunction } from "express";
import db from "../config/dbconfig";

export const checkDbConnection = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!db) {
    return res.json({ success: false, message: "Database connection failed" });
  }
  next();
};
