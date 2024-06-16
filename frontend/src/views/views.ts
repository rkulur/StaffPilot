import loginHTML from "./html/login.html?raw";
import dashboardHTML from "./html/dashboard.html?raw";
import { departmentStructure } from "./departmentView";
import { employeeStructure } from "./employeeView";

export const loginView = loginHTML;
export const dashboardView = dashboardHTML;
export const departmentView = departmentStructure("");
export const employeeView = employeeStructure(null);
