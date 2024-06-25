export type Department = {
  id: string;
  name: string;
};
export const departmentStructure = (rows: string) => `
<main class="h-full lg:h-screen flex flex-col items-center py-32 px-20 gap-5">
  <h1>EMPLOYEE MANAGEMENT SYSTEM</h1>
  <h3>DEPARTMENT</h3>
  ${
    rows === ""
      ? `<p>No Department present</p>`
      : `<table class="lg:w-3/4 border">
          <thead class="thead">
            <tr class="bg-gray-200">
              <th class="px-4 py-2 border">Dept ID</th>
              <th class="px-4 py-2 border">Department Name</th>
              <th class="px-4 py-2 border"></th>
            </tr>
          </thead>
          <tbody id="tbody">
            ${rows}
          </tbody>
        </table>`
  }
  <div class="flex gap-8">
    <button class="button" id="goBackBtn">Go Back</button>
    <button class="button" id="insertDeptBtn">Insert</button>
  </div>
</main>
`;

export const tableRow = (dept: Department, toUpdate: boolean = false) => `
  ${
    toUpdate
      ? updateRow(dept)
      : `<tr class="tr">
          <td data-td="Id : " class="td">${dept.id}</td>
          <td data-td="Name : " class="td">${dept.name}</td>
          <td class="td flex gap-4 lg:gap-10 justify-around">
            <button
              class="updateDeptBtn bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600 active:scale-95"
              id=${dept.id}
            >
              Update
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95 deleteDeptBtn"
              id=${dept.id}
            >
              Delete
            </button>
          </td>
        </tr>`
  }
`;

const updateRow = (dept: Department) => `
<tr class="tr">
  <td data-td="Id : " class="td">${dept.id}</td>
  <td data-td="Name : " class="td">
    <input type="text" value="${dept.name}" class="text-center" id="newDeptName" />
  </td>
  <td class="td flex gap-4 lg:gap-10 justify-around">
    <button
      class="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600 active:scale-95 confirmUpdateBtn"
    >
      Confirm
    </button>
    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95 cancelUpdateBtn">
      Cancel
    </button>
  </td>
</tr>
`;

export const insertRow = `
<tr class="tr">
  <td data-td="Id : " class="td"></td>
  <td data-td="Name : " class="td">
    <input type="text" class="text-center" id="newDeptName" />
  </td>
  <td class="td flex gap-4 lg:gap-10 justify-around">
    <button
      class="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600 active:scale-95 confirmInsertBtn"
    >
      Confirm
    </button>
    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95 cancelInsertBtn">
      Cancel
    </button>
  </td>
</tr>
`;
