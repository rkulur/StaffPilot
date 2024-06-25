import axios from "axios";
import { Department } from "../views/departmentView";
import { Employee, empTable, insertRow, tableRow } from "../views/employeeView";
import { insertTableInSection } from "./showEmployee";
import Swal from "sweetalert2";
import { validateInput } from "./validateInput";
import { getAllEmployeeByDeptId } from "./getEmployeeByDeptId";
import { getAllEmployees } from "./getAllEmployees";

export const insertEmployee = (
  empTableSection: HTMLElement,
  emps: Employee[],
  depts: Department[],
  deptno: string = "0",
) => {
  let rows = ``;
  emps.forEach((emp) => {
    rows += tableRow(emp, depts);
  });
  rows += insertRow(depts, deptno);
  const table = empTable(rows);
  empTableSection.innerHTML = table;

  const cancelInsertBtn = document.querySelector(
    ".cancelInsertBtn",
  ) as HTMLButtonElement;

  cancelInsertBtn.addEventListener("click", () => {
    insertTableInSection(empTableSection, emps, depts, deptno);
  });

  const DOJ = document.querySelector("#newDOJ") as HTMLInputElement;
  DOJ.addEventListener("keypress", (event) => {
    event.preventDefault();
  });

  DOJ.addEventListener("paste", (event) => {
    event.preventDefault();
  });

  DOJ.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  const confirmInsertBtn = document.querySelector(
    ".confirmInsertBtn",
  ) as HTMLButtonElement;

  confirmInsertBtn.addEventListener("click", async () => {
    const newFirstName = (
      document.querySelector("#newFirstName") as HTMLInputElement
    ).value;
    const newLastName = (
      document.querySelector("#newLastName") as HTMLInputElement
    ).value;
    const newEmail = (document.querySelector("#newEmail") as HTMLInputElement)
      .value;
    const newPhoneNumber = (
      document.querySelector("#newPhoneNumber") as HTMLInputElement
    ).value;
    const newDOJ = (document.querySelector("#newDOJ") as HTMLInputElement)
      .value;
    const newSalary = (document.querySelector("#newSalary") as HTMLInputElement)
      .value;
    let newDeptNo = deptno;
    if (deptno === "0") {
      newDeptNo = (
        (
          document.querySelector("#selectNewDept") as HTMLSelectElement
        ).querySelector("option:checked") as HTMLOptionElement
      ).value;
    }

    const isValidated = validateInput(
      newFirstName,
      newLastName,
      newEmail,
      newPhoneNumber,
      newDOJ,
      newSalary,
      newDeptNo,
    );

    if (!isValidated) {
      return;
    }

    empTableSection.innerHTML = `<i class="fa-solid fa-circle-notch rotate-spinner"></i>`;
    const res = await axios.post(
      import.meta.env.VITE_API_PATH + "/employee",
      {
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        phonenumber: newPhoneNumber,
        doj: newDOJ,
        salary: newSalary,
        deptno: newDeptNo,
      },
      {
        withCredentials: true,
      },
    );

    if (res.data.success) {
      Swal.fire({
        title: "Inserted!",
        text: res.data.message,
        icon: "success",
      });
      insertTableInSection(
        empTableSection,
        deptno === "0"
          ? await getAllEmployees()
          : await getAllEmployeeByDeptId(deptno),
        depts,
        deptno,
      );
    } else {
      Swal.fire({
        title: "Oops!",
        text: res.data.message,
        icon: "error",
      });
      insertTableInSection(empTableSection, emps, depts, deptno);
    }
  });
};
