import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {
  authenticationRouter,
  departmentRouter,
  employeeRouter,
} from "./routes";
import { checkDbConnection } from "./middlewares/dbConnectionCheck";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.API_PATH,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkDbConnection);
app.use("/department", departmentRouter);
app.use("/employee", employeeRouter);
app.use("/auth", authenticationRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
