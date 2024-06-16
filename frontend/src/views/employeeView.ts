import { Department } from "./departmentView";

export type Employee = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  doj: string;
  salary: number;
  deptno: number;
};

export const employeeStructure = (depts: Department[] | null = null) => `
<main class="h-full lg:h-screen flex flex-col items-center py-32 px-20 gap-5">
  <h1>EMPLOYEE MANAGEMENT SYSTEM</h1>
  <h3>EMPLOYEE</h3>
  <div class="w-fit">
    <select id="selectDept" class="block py-2 px-1 text-center w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
      ${depts ? addSelectOptions(depts) : ""}
    </select>
  </div>
  <section id="empTableSection"></section>
  <div class="flex gap-8">
    <button class="button" id="goBackBtn">Go Back</button>
    <button class="button" id="insertEmpBtn">Insert</button>
  </div>
</main>
`;

export const empTable = (rows: string) => `
  ${
    rows === ""
      ? `<p>No Employee Present</p>`
      : `
      <table class="lg:min-w-full bg-white border">
        <thead class="thead">
          <tr class="bg-gray-200">
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">First Name</th>
            <th class="px-4 py-2 border">Last Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Phone Number</th>
            <th class="px-4 py-2 border">DOJ</th>
            <th class="px-4 py-2 border">Salary</th>
            <th class="px-4 py-2 border">Dept Number</th>
            <th class="px-4 py-2 border"></th>
            <th class="px-4 py-2 border"></th>
          </tr>
        </thead>
        <tbody id="tbody" class="relative">
          ${rows}
        </tbody>
      </table>
      `
  }
`;

const addSelectOptions = (depts: Department[], deptno: string = "0") => {
  let options = `<option value="0"> All Departments </option>`;
  depts.forEach((dept) => {
    if (dept.id === deptno) {
      options += `<option value=${dept.id} selected>${dept.name}</option>`;
    } else {
      options += `<option value=${dept.id}>${dept.name}</option>`;
    }
  });
  return options;
};

export const tableRow = (
  emp: Employee,
  depts: Department[],
  toUpdate: boolean = false,
) => `
  ${
    toUpdate
      ? updateRow(emp, depts)
      : `
      <tr class="tr">
        <td data-td="Id : " class="td">${emp.id}</td>
        <td data-td="First Name : " class="td">${emp.firstname}</td>
        <td data-td="Last Name : " class="td">${emp.lastname}</td>
        <td data-td="Email : " class="td">${emp.email}</td>
        <td data-td="Phone Number : " class="td">${emp.phonenumber}</td>
        <td data-td="DOJ : " class="td">${emp.doj.substr(0, 10)}</td>
        <td data-td="Salary : " class="td">${emp.salary}</td>
        <td data-td="Dept No : " class="td">${emp.deptno}</td>
        <td class="td flex gap-4 lg:gap-10 justify-around">
          <button
            class="updateEmpBtn bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600 active:scale-95"
            id="${emp.id}"
          >
            Update
          </button>
          <button
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95 deleteEmpBtn"
            id="${emp.id}"
          >
            Delete
          </button>
        </td>
      </tr>
      `
  }
`;

export const updateRow = (emp: Employee, depts: Department[]) => `
<tr class="tr">
  <td data-td="Id : " class="td">${emp.id}</td>
  <td data-td="First Name : " class="td">
    <input type="text" value="${emp.firstname}" class="text-center inp" id="newFirstName" />
  </td>
  <td data-td="Last Name : " class="td">
    <input type="text" value="${emp.lastname}" class="text-center inp" id="newLastName" />
  </td>
  <td data-td="Email : " class="td">
    <input type="text" value="${emp.email}" class="text-center inp" id="newEmail" />
  </td>
  <td data-td="Phone Number : " class="td">
    <input type="text" value="${emp.phonenumber}" class="text-center inp" id="newPhoneNumber" />
  </td>
  <td data-td="DOJ : " class="td">
    <input type="date" value="${emp.doj.substr(0, 10)}" max="${new Date().toISOString().split("T")[0]}" class="text-center" id="newDOJ" />
  </td>
  <td data-td="Salary : " class="td">
    <input type="text" value="${emp.salary}" class="text-center inp" id="newSalary" />
  </td>
  <td class="td">
    <select id="selectNewDept" class="block py-2 px-1 text-center w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
      ${addSelectOptions(depts, emp.deptno.toString())}
    </select>
  </td>
  <td class="td flex gap-4 lg:gap-10 justify-around">
    <button class="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600 active:scale-95 confirmUpdateBtn">
      Confirm
    </button>
    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95 cancelUpdateBtn">
      Cancel
    </button>
  </td>
</tr>
`;

export const insertRow = (depts: Department[], deptno: string) => `
<tr class="tr">
  <td data-td="Id : " class="td"></td>
  <td data-td="First Name : " class="td">
    <input required type="text" class="text-center inp" id="newFirstName" />
  </td>
  <td data-td="Last Name : " class="td">
    <input required type="text" class="text-center inp" id="newLastName" />
  </td>
  <td data-td="Email : " class="td">
    <input required type="text" class="text-center inp" id="newEmail" />
  </td>
  <td data-td="Phone Number : " class="td">
    <input required type="text" class="text-center inp" id="newPhoneNumber" />
  </td>
  <td data-td="DOJ : " class="td">
    <input required type="date" max=${new Date().toISOString().split("T")[0]} class="text-center w-full" id="newDOJ" />
  </td>
  <td data-td="Salary : " class="td">
    <input required type="text" class="text-center inp" id="newSalary" />
  </td>
  <td class="td">
    ${
      deptno === "0"
        ? `

        <select id="selectNewDept" class="block py-2 px-1 text-center w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          ${addSelectOptions(depts)}
        </select>
    `
        : deptno
    }
  </td>
  <td class="td flex gap-4 lg:gap-10 justify-around">
    <button class="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600 active:scale-95 confirmInsertBtn">
      Confirm
    </button>
    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95 cancelInsertBtn">
      Cancel
    </button>
  </td>
</tr>
`;
