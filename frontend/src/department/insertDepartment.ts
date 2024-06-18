import axios from "axios";
import { routes } from "../main";
import {
  Department,
  tableRow,
  insertRow,
  departmentStructure,
} from "../views/departmentView";
import { showDepartment } from "./showDepartment";
import { getAllDepartments } from "./getAllDepartment";
import Swal from "sweetalert2";
import { spinner } from "../views/spinner";

export const insertDepartment = (app: HTMLDivElement, depts: Department[]) => {
  let rows = ``;
  depts.forEach((dept) => {
    rows += tableRow(dept);
  });
  rows += insertRow;
  routes["/department"] = departmentStructure(rows);
  app.innerHTML = routes["/department"];

  const confirmInsertBtn = document.querySelector(
    ".confirmInsertBtn",
  ) as HTMLButtonElement;

  const cancelInsertBtn = document.querySelector(
    ".cancelInsertBtn",
  ) as HTMLButtonElement;

  cancelInsertBtn.addEventListener("click", () => {
    showDepartment(app, depts);
  });

  confirmInsertBtn.addEventListener("click", async () => {
    const newDeptName = (
      document.querySelector("#newDeptName") as HTMLInputElement
    ).value;

    app.innerHTML = spinner;
    const res = await axios.post(
      import.meta.env.VITE_API_PATH + `/department`,
      { name: newDeptName },
      { withCredentials: true },
    );

    if (res.data.success) {
      Swal.fire({
        title: "Inserted!",
        text: res.data.message,
        icon: "success",
      });
      showDepartment(app, await getAllDepartments());
    } else {
      Swal.fire({
        title: "Oops!",
        text: res.data.message,
        icon: "error",
      });
      showDepartment(app, depts);
    }
  });
};
