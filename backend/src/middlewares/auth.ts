import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../config/dbconfig";

export const auth = (
  req: Request & { cookies: { token: string } },
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  const { username } = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!,
  ) as JwtPayload;
  console.log(username);
  next();
};
