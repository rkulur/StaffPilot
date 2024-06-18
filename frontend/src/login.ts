import axios from "axios";
import Cookie from "js-cookie";
import Swal from "sweetalert2";
import { spinner } from "./views/spinner";
import { routes } from "./main";

export const login = async (app: HTMLDivElement) => {
  const username = (document.querySelector("#username") as HTMLInputElement)
    .value;
  const password = (document.querySelector("#password") as HTMLInputElement)
    .value;

  app.innerHTML = spinner;
  const res = await axios.post(
    import.meta.env.VITE_API_PATH + "/auth/login",
    { username, password },
    { withCredentials: true },
  );
  if (!res.data.success) {
    await Swal.fire({
      title: "Oops!",
      text: res.data.message,
      icon: "error",
      confirmButtonColor: "#FACC15",
      confirmButtonText: "OK",
    });
    app.innerHTML = routes["/"];
    return;
  }
  await Swal.fire({
    title: "Logged In!",
    text: "Login successfull",
    icon: "success",
    confirmButtonColor: "#FACC15",
    confirmButtonText: "OK",
  });
  const jwt = res.data.token;
  Cookie.set("jwt", jwt, { path: "/", sameSite: "None", secure: true });
  window.location.replace("/dashboard");
};
