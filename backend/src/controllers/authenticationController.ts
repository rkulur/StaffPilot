import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../config/dbconfig";

type authenticationType = {
  username: string;
  password: string;
};

function sendToken(res: Response, payload: authenticationType) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "24h",
  });

  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  res.cookie("token", token, {
    expires,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return token;
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body as authenticationType;
  try {
    const user =
      await db!`SELECT id FROM users WHERE username=${username} AND password=${password}`;
    if (user.length === 0) {
      return res.json({
        success: false,
        message: `Invalid username and password`,
      });
    }
    const validUsername =
      await db!`SELECT password FROM users WHERE username=${username}`;
    if (validUsername.length === 0) {
      return res.json({
        success: false,
        message: `Invalid username`,
      });
    }
    if (validUsername[0].password !== password.toString()) {
      return res.json({
        success: false,
        message: `Invalid password`,
      });
    }
    const token = sendToken(res, { username, password });
    res.json({
      success: true,
      message: `User login successfull`,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `An error occured during login`,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body as authenticationType;
  try {
    const user = await db!`SELECT id FROM users WHERE username=${username}`;
    if (user.length > 0) {
      return res.json({
        success: false,
        message: `User already present`,
      });
    }

    await db!`INSERT INTO users(username, password) VALUES(${username}, ${password})`;
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "24h",
    });

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    res
      .cookie("token", token, {
        expires,
      })
      .json({
        success: true,
        message: `User registration successfull`,
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `An error occured during registration`,
    });
  }
};
