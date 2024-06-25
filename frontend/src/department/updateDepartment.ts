import axios from "axios";
import { routes } from "../main";
import {
  Department,
  tableRow,
  departmentStructure,
} from "../views/departmentView";
import { showDepartment } from "./showDepartment";
import { getAllDepartments } from "./getAllDepartment";
import Swal from "sweetalert2";
import { loader } from "../views/spinner";

export const updateDepartment = (
  app: HTMLDivElement,
  depts: Department[],
  id: string,
) => {
  let rows = ``;
  depts.forEach((dept) => {
    if (dept.id === id) {
      rows += tableRow(dept, true);
    } else {
      rows += tableRow(dept);
    }
  });

  routes["/department"] = departmentStructure(rows);
  app.innerHTML = routes["/department"];

  const confirmUpdateBtn = document.querySelector(
    ".confirmUpdateBtn",
  ) as HTMLButtonElement;

  const cancelUpdateBtn = document.querySelector(
    ".cancelUpdateBtn",
  ) as HTMLButtonElement;

  cancelUpdateBtn.addEventListener("click", () => {
    showDepartment(app, depts);
  });

  confirmUpdateBtn.addEventListener("click", async () => {
    const newDeptName = (
      document.querySelector("#newDeptName") as HTMLInputElement
    ).value;

    app.innerHTML = loader;
    const res = await axios.put(
      import.meta.env.VITE_API_PATH + `/department/${id}`,
      { name: newDeptName },
      { withCredentials: true },
    );

    if (res.data.success) {
      Swal.fire({
        title: "Updated!",
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
