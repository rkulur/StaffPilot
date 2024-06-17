import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";

export const auth = (
  req: Request & { cookies: { token: string } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { jwt } = req.cookies;
    console.log(req.cookies);
    const { username } = JWT.verify(
      jwt,
      process.env.JWT_SECRET_KEY!,
    ) as JwtPayload;
    console.log(username);
    next();
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
