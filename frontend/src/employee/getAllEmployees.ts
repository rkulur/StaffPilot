import axios from "axios";
import { Employee } from "../views/employeeView";

export const getAllEmployees = async () => {
  const res = await axios.get(import.meta.env.VITE_API_PATH + "/employee", {
    withCredentials: true,
  });
  return res.data.emps as Employee[];
};
