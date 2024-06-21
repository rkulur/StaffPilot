import axios from "axios";
import { Department } from "../views/departmentView";
import Swal from "sweetalert2";
import { showDepartment } from "./showDepartment";
import { getAllDepartments } from "./getAllDepartment";
import { spinner } from "../views/spinner";

export const deleteDepartment = async (
  app: HTMLDivElement,
  depts: Department[],
  id: string,
) => {
  const result = await Swal.fire({
    title: "Handle Department Deletion",
    text: "How would you like to handle employees present in this department?",
    icon: "warning",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonColor: "#FACC15",
    denyButtonColor: "#FACC15",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete employees",
    denyButtonText: "Set to null",
    cancelButtonText: "Cancel",
  });

  if (result.isDismissed) {
    return;
  }

  let cascadeOnDelete = false;

  if (result.isConfirmed) {
    cascadeOnDelete = true;
  }

  app.innerHTML = spinner;
  const res = await axios.delete(
    import.meta.env.VITE_API_PATH + `/department/${id}/${cascadeOnDelete}`,
    { withCredentials: true },
  );

  if (res.data.success) {
    Swal.fire({
      title: "Deleted!",
      text: res.data.message,
      icon: "success",
    });
    showDepartment(app, await getAllDepartments());
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: res.data.message,
    });
    showDepartment(app, depts);
  }
};
