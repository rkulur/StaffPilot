import axios from "axios";
import Cookie from "js-cookie";

export const login = async () => {
  const username = (document.querySelector("#username") as HTMLInputElement)
    .value;
  const password = (document.querySelector("#password") as HTMLInputElement)
    .value;

  const res = await axios.post(
    import.meta.env.VITE_API_PATH + "/auth/login",
    { username, password },
    { withCredentials: true },
  );
  alert(res.data.message);
  const jwt = res.data.token;
  console.log(jwt);
  Cookie.set("jwt", jwt, { path: "/", sameSite: "None" });
  console.log(Cookie.get("jwt"));
  return;
  window.location.replace("/dashboard");
  return;
};
