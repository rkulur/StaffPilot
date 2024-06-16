import express from "express";
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeByDepartmentId,
  getEmployeeById,
  insertEmployee,
  updateEmployee,
} from "../controllers/employeeController";

const router = express.Router();

router.route("/").get(getAllEmployees).post(insertEmployee);
router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);
router.get("/dept/:id", getEmployeeByDepartmentId);

export { router };
