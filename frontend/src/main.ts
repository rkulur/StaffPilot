import {
  dashboardView,
  departmentView,
  employeeView,
  loginView,
} from "./views/views";
import "./style.css";
import { login } from "./login";
import Cookie from "js-cookie";
import { getAllDepartments } from "./department/getAllDepartment";
import { showDepartment } from "./department/showDepartment";
import { getAllEmployees } from "./employee/getAllEmployees";
import { showEmployee } from "./employee/showEmployee";

export const routes = {
  "/": loginView,
  "/dashboard": dashboardView,
  "/department": departmentView,
  "/employee": employeeView,
};

const app = document.querySelector("#app")! as HTMLDivElement;

let path = window.location.pathname;
const token = Cookie.get("jwt");
const isRootPath = path === "/";
const isTokenUndefined = token === undefined;

console.log(token);
if (isTokenUndefined) {
  handleNoToken();
} else {
  handleTokenExists();
}

function handleNoToken() {
  if (!isRootPath) {
    navigateTo("/");
  }
  app.innerHTML = routes["/"];
}

function handleTokenExists() {
  const targetPath = isRootPath ? "/dashboard" : path;
  if (window.location.pathname === "/") {
    navigateTo("/dashboard");
  }
  const route = routes[targetPath as keyof typeof routes];

  if (route === undefined) {
    navigateTo("/dashboard");
    app.innerHTML = routes["/dashboard"];
  } else {
    app.innerHTML = route;
  }
}

window.addEventListener("popstate", async () => {
  console.log("pop state");
  app.innerHTML = routes[window.location.pathname as keyof typeof routes];
});

export function navigateTo(pathname: string) {
  const prevPathname = window.location.pathname;
  window.location.replace(pathname);
  window.history.pushState({}, "", prevPathname);
}

document.addEventListener("DOMContentLoaded", () => {
  handleRoutes();
});

async function handleRoutes() {
  const pathName = window.location.pathname;
  if (pathName === "/") {
    const loginForm = document.querySelector("#loginForm")! as HTMLFormElement;
    console.log(loginForm);
    loginForm.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      login(app);
    });
  }

  if (pathName === "/dashboard") {
    const btns = document.querySelectorAll(
      "button",
    ) as NodeListOf<HTMLButtonElement>;
    console.log(btns);
    Array.from(btns).forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.id === "departmentBtn") {
          navigateTo("/department");
        }
        if (btn.id === "employeeBtn") {
          navigateTo("/employee");
        }
      });
    });
  }

  if (pathName === "/department") {
    app.innerHTML = `<i class="fa-solid fa-rotate-right animate-spin"></i>`;
    const depts = await getAllDepartments();
    showDepartment(app, depts);
  }

  if (pathName === "/employee") {
    app.innerHTML = `<i class="fa-solid fa-rotate-right animate-spin"></i>`;
    const depts = await getAllDepartments();
    const emps = await getAllEmployees();
    showEmployee(app, depts, emps);
  }
}
