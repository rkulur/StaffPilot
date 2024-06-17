import axios from "axios";
import Cookie from "js-cookie";
import Swal from "sweetalert2";

export const login = async (app: HTMLDivElement) => {
  const username = (document.querySelector("#username") as HTMLInputElement)
    .value;
  const password = (document.querySelector("#password") as HTMLInputElement)
    .value;

  app.innerHTML = `<i class="fa-solid fa-rotate-right animate-spin"></i>`;
  const res = await axios.post(
    import.meta.env.VITE_API_PATH + "/auth/login",
    { username, password },
    { withCredentials: true },
  );
  Swal.fire({
    title: "Logged In!",
    text: res.data.message,
    icon: "success",
  });
  const jwt = res.data.token;
  Cookie.set("jwt", jwt, { path: "/", sameSite: "None", secure: true });
  window.location.replace("/dashboard");
};
