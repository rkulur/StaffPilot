import axios from "axios";

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
  window.location.replace("/dashboard");
  return;
};
