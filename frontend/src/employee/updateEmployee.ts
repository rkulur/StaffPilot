import axios from "axios";
import { Department } from "../views/departmentView";
import { Employee, empTable, tableRow } from "../views/employeeView";
import { insertTableInSection } from "./showEmployee";
import { validateInput } from "./validateInput";
import Swal from "sweetalert2";
import { getAllEmployeeByDeptId } from "./getEmployeeByDeptId";
import { getAllEmployees } from "./getAllEmployees";

export const updateEmployee = (
  empTableSection: HTMLElement,
  emps: Employee[],
  depts: Department[],
  id: string,
  deptno: string,
) => {
  let rows = ``;
  emps.forEach((emp) => {
    if (emp.id.toString() === id) {
      rows += tableRow(emp, depts, true);
    } else {
      rows += tableRow(emp, depts);
    }
  });
  const table = empTable(rows);
  empTableSection.innerHTML = table;

  const cancelUpdateBtn = document.querySelector(
    ".cancelUpdateBtn",
  ) as HTMLButtonElement;

  cancelUpdateBtn.addEventListener("click", () => {
    insertTableInSection(empTableSection, emps, depts, deptno);
  });

  const confirmUpdateBtn = document.querySelector(
    ".confirmUpdateBtn",
  ) as HTMLButtonElement;

  confirmUpdateBtn.addEventListener("click", async () => {
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
    console.log(document.querySelector("#selectNewDept") as HTMLSelectElement);
    const newDeptNo = (
      (
        document.querySelector("#selectNewDept") as HTMLSelectElement
      ).querySelector("option:checked") as HTMLOptionElement
    ).value;

    console.log(
      newFirstName,
      newLastName,
      newEmail,
      newPhoneNumber,
      newDOJ,
      newSalary,
      newDeptNo,
    );

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
    const res = await axios.put(
      import.meta.env.VITE_API_PATH + `/employee/${id}`,
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
        title: "Updated!",
        text: res.data.message,
        icon: "success",
      });
      const employees =
        deptno === "0"
          ? await getAllEmployees()
          : await getAllEmployeeByDeptId(deptno);

      insertTableInSection(empTableSection, employees, depts, deptno);
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
