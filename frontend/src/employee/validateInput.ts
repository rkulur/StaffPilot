import Swal from "sweetalert2";

export function validateInput(
  firstname: string,
  lastname: string,
  email: string,
  phonenumber: string,
  doj: string,
  salary: string,
  deptno: string,
) {
  console.log(
    "firstname:",
    firstname,
    "lastname:",
    lastname,
    "email:",
    email,
    "phonenumber:",
    phonenumber,
    "doj:",
    doj,
    "salary:",
    salary,
    "deptno:",
    deptno,
  );

  let message = "";

  if (firstname === "") {
    message += "First name is required<br>";
  }
  if (lastname === "") {
    message += "Last name is required<br>";
  }
  if (email === "") {
    message += "Email is required<br>";
  }
  if (phonenumber === "") {
    message += "Phone number is required<br>";
  } else if (phonenumber.length > 10 || isNaN(Number(phonenumber))) {
    message += "Invalid phone number<br>";
  }
  if (doj === "") {
    message += "DOJ is required<br>";
  }
  if (salary === "") {
    message += "Salary is required<br>";
  }
  if (deptno === "0") {
    message += "Select a dept";
  }

  Swal.fire({
    title: "Required!",
    html: message,
    icon: "warning",
  });

  return message.length === 0;
}
