import { navigateTo, routes } from "../main";
import { Department } from "../views/departmentView";
import {
  Employee,
  empTable,
  employeeStructure,
  tableRow,
} from "../views/employeeView";
import { deleteEmployee } from "./deleteEmployee";
import { getAllEmployees } from "./getAllEmployees";
import { getAllEmployeeByDeptId } from "./getEmployeeByDeptId";
import { insertEmployee } from "./insertEmployee";
import { updateEmployee } from "./updateEmployee";

export const showEmployee = (
  app: HTMLDivElement,
  depts: Department[],
  emps: Employee[],
) => {
  routes["/employee"] = employeeStructure(depts);
  app.innerHTML = routes["/employee"];

  let employees = emps;
  const empTableSection = document.querySelector(
    "#empTableSection",
  ) as HTMLElement;
  insertTableInSection(empTableSection, employees, depts);
  let deptno = "0";
  const selectDept = document.querySelector("#selectDept") as HTMLSelectElement;
  selectDept.addEventListener("change", async () => {
    console.log("inside select");
    const selectedDept = selectDept.querySelector(
      "option:checked",
    ) as HTMLOptionElement;

    empTableSection.innerHTML = `<i class="fa-solid fa-rotate-right animate-spin"></i>`;
    deptno = selectedDept.value;
    if (deptno === "0") {
      employees = await getAllEmployees();
    } else {
      employees = await getAllEmployeeByDeptId(deptno);
    }
    insertTableInSection(empTableSection, employees, depts);
  });

  const insertEmpBtn = document.querySelector(
    "#insertEmpBtn",
  ) as HTMLButtonElement;
  insertEmpBtn.addEventListener("click", () => {
    insertEmployee(empTableSection, employees, depts, deptno);
  });

  const goBackBtn = document.querySelector("#goBackBtn") as HTMLButtonElement;
  goBackBtn.addEventListener("click", () => {
    navigateTo("/dashboard");
  });
};

export function insertTableInSection(
  empTableSection: HTMLElement,
  emps: Employee[],
  depts: Department[],
) {
  let rows = ``;
  emps.forEach((emp) => {
    rows += tableRow(emp, depts);
  });
  const table = empTable(rows);
  empTableSection.innerHTML = table;

  const buttons = empTableSection.querySelectorAll(
    "button",
  ) as NodeListOf<HTMLButtonElement>;

  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", () => {
      console.log("inside button");
      if (button.classList.contains("updateEmpBtn")) {
        updateEmployee(empTableSection, emps, depts, button.id);
      }
      if (button.classList.contains("deleteEmpBtn")) {
        deleteEmployee(empTableSection, emps, depts, button.id);
      }
    });
  });
}
