import express from "express";
import { login, register } from "../controllers/authenticationController";

const router = express.Router();
router.post("/login", login);
router.post("/register", register);

export { router };
