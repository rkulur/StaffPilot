import { Request, Response } from "express";
import db from "../config/dbconfig";

type departmentType = {
  id: number;
  name: string;
};

export const insertDepartment = async (req: Request, res: Response) => {
  const { name } = req.body as departmentType;
  try {
    await db!`INSERT INTO department(name) VALUES(${name})`;
    res.json({
      success: true,
      message: `Department ${name} inserted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while inserting department`,
    });
  }
};

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const depts =
      (await db!`SELECT * FROM department ORDER BY id`) as departmentType[];
    res.json({
      success: true,
      message: `Departments fetched successfully`,
      depts,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while fetching departments`,
    });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dept =
      (await db!`SELECT id FROM department WHERE id=${id} ORDER BY id`) as departmentType[];

    if (dept.length === 0) {
      res.json({
        success: false,
        message: `Invalid id`,
      });
      return;
    }

    res.json({
      success: true,
      message: `Department fetched successfully`,
      dept,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while fetching department`,
    });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body as departmentType;

  try {
    const dept =
      (await db!`SELECT id FROM department WHERE id=${id}`) as departmentType[];

    if (dept.length === 0) {
      res.json({
        success: false,
        message: `Invalid id`,
      });
      return;
    }

    await db!`UPDATE department SET name=${name} WHERE id=${id}`;
    res.json({
      success: true,
      message: `Department updated successfully`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while updating department`,
    });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id, cascadeOnDelete } = req.params;
  console.log("cascadeOnDelete", cascadeOnDelete);
  try {
    const dept =
      (await db!`SELECT id FROM department WHERE id=${id}`) as departmentType[];

    if (dept.length === 0) {
      res.json({
        success: false,
        message: `Invalid id`,
      });
      return;
    }

    if (cascadeOnDelete === "true") {
      await db!`DELETE FROM employee WHERE deptno = ${id}`;
    } else {
      await db!`UPDATE employee SET deptno=NULL WHERE deptno=${id}`;
    }

    await db!`DELETE FROM department WHERE id=${id}`;
    res.json({
      success: true,
      message: `Department deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while deleting department`,
    });
  }
};
