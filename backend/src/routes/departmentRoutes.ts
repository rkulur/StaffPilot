import express from "express";

import {
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  insertDepartment,
  updateDepartment,
} from "../controllers/departmentController";
const router = express.Router();

router.route("/").post(insertDepartment).get(getAllDepartments);

router.route("/:id").get(getDepartmentById).put(updateDepartment);
router.route("/:id/:cascadeOnDelete").delete(deleteDepartment);
export { router };
