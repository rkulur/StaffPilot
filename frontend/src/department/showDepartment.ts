import { navigateTo, routes } from "../main";
import {
  Department,
  tableRow,
  departmentStructure,
} from "../views/departmentView";
import { deleteDepartment } from "./deleteDepartment";
import { insertDepartment } from "./insertDepartment";
import { updateDepartment } from "./updateDepartment";

export const showDepartment = (app: HTMLDivElement, depts: Department[]) => {
  let rows = ``;
  depts.forEach((dept) => {
    rows += tableRow(dept);
  });
  routes["/department"] = departmentStructure(rows);
  app.innerHTML = routes["/department"];
  const buttons = document.querySelectorAll(
    "button",
  ) as NodeListOf<HTMLButtonElement>;

  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("updateDeptBtn")) {
        updateDepartment(app, depts, button.id);
      }
      if (button.classList.contains("deleteDeptBtn")) {
        deleteDepartment(app, depts, button.id);
      }
    });
  });
  const insertDeptBtn = document.querySelector(
    "#insertDeptBtn",
  ) as HTMLButtonElement;

  insertDeptBtn.addEventListener("click", () => {
    insertDepartment(app, depts);
  });

  const goBackBtn = document.querySelector("#goBackBtn") as HTMLButtonElement;
  goBackBtn.addEventListener("click", () => {
    navigateTo("/dashboard");
  });
};
