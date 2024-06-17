import express from "express";

import {
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  insertDepartment,
  updateDepartment,
} from "../controllers/departmentController";
import { auth } from "../middlewares/auth";
const router = express.Router();

router.route("/").post(insertDepartment).get(getAllDepartments);

router
  .route("/:id")
  .get(getDepartmentById)
  .put(updateDepartment)
  .delete(deleteDepartment);

export { router };
