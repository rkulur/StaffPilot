import axios from "axios";
import { Department } from "../views/departmentView";

export const getAllDepartments = async () => {
  const res = await axios.get(import.meta.env.VITE_API_PATH + "/department", {
    withCredentials: true,
  });
  return res.data.depts as Department[];
};
