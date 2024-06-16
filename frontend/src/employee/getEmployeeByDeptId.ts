import axios from "axios";
import { Employee } from "../views/employeeView";

export const getAllEmployeeByDeptId = async (id: string) => {
  const res = await axios.get(
    import.meta.env.VITE_API_PATH + `/employee/dept/${id}`,
    {
      withCredentials: true,
    },
  );
  return res.data.emps as Employee[];
};
