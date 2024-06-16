import { Request, Response } from "express";
import db from "../config/dbconfig";

type employeeType = {
  id: number;
  firstname: number;
  lastname: number;
  email: string;
  phonenumber: number;
  doj: string;
  salary: number;
  deptno: number;
};

export const insertEmployee = async (req: Request, res: Response) => {
  const { firstname, lastname, email, phonenumber, doj, salary, deptno } =
    req.body as employeeType;
  console.log(firstname, lastname, email, phonenumber, doj, salary, deptno);
  try {
    await db!`INSERT INTO employee( firstname, lastname, email, phonenumber, doj, salary, deptno)
              VALUES(${firstname}, ${lastname}, ${email}, ${phonenumber}, ${doj}, ${salary}, ${deptno})`;
    res.json({
      success: true,
      message: `Employee inserted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while inserting employee`,
    });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const emps = (await db!`SELECT * FROM employee`) as employeeType[];
    res.json({
      success: true,
      message: `Employees fetched successfully`,
      emps,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while fetching employees`,
    });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const emp =
      (await db!`SELECT * FROM employee WHERE id=${id}`) as employeeType[];

    if (emp.length === 0) {
      res.json({
        success: false,
        message: `Invalid id`,
        emp: [],
      });
      return;
    }

    res.json({
      success: true,
      message: `Employee fetched successfully`,
      emp,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while fetching employee`,
    });
  }
};

export const getEmployeeByDepartmentId = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const emps =
      (await db!`SELECT * FROM employee WHERE deptno=${id}`) as employeeType[];

    if (emps.length === 0) {
      res.json({
        success: false,
        message: `Invalid id`,
        emps: [],
      });
      return;
    }

    res.json({
      success: true,
      message: `Employee fetched successfully`,
      emps,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while fetching employee`,
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname, email, phonenumber, doj, salary, deptno } =
    req.body as employeeType;

  try {
    const emp =
      (await db!`SELECT id FROM employee WHERE id=${id}`) as employeeType[];

    if (emp.length === 0) {
      res.json({
        success: false,
        message: `Invalid id`,
      });
      return;
    }

    await db!`
      UPDATE employee 
      SET 
        firstname = ${firstname !== undefined ? firstname : db!`firstname`},
        lastname = ${lastname !== undefined ? lastname : db!`lastname`},
        email = ${email !== undefined ? email : db!`email`},
        phonenumber = ${phonenumber !== undefined ? phonenumber : db!`phonenumber`},
        doj = ${doj !== undefined ? doj : db!`doj`},
        salary = ${salary !== undefined ? salary : db!`salary`},
        deptno = ${deptno !== undefined ? deptno : db!`deptno`}
      WHERE id = ${id}
    `;
    res.json({
      success: true,
      message: `Employee updated successfully`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while updating employee`,
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const emp =
      (await db!`SELECT id FROM employee WHERE id=${id}`) as employeeType[];

    if (emp.length === 0) {
      res.json({
        success: false,
        message: `Invalid id`,
      });
      return;
    }

    await db!`DELETE FROM employee WHERE id=${id}`;
    res.json({
      success: true,
      message: `Employee deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: `An error occured while deleting employee`,
    });
  }
};
