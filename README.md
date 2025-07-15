# StaffPilot

**A Full-Stack Employee Management System**

StaffPilot is a modern web app that makes managing employees and departments simple. It's built with a strong Node.js backend and a sleek TypeScript frontend for a smooth, secure, and responsive experience.

---

## Features

-   **Secure Authentication**
    -   JWT-based login and registration
    -   Cookie-based session handling for protected routes
-   **Department Management**
    -   Create, view, update, and delete departments
    -   Cascade delete or reassign employees when removing departments
-   **Employee Management**
    -   Full CRUD operations on employee records
    -   Retrieve employees by department

---

## Tech Stack

### Frontend

-   Vite
-   TypeScript
-   Tailwind CSS
-   js-cookie
-   SweetAlert2

### Backend

-   Node.js
-   Express
-   Axios
-   TypeScript
-   Supabase (`postgres` Node client)
-   JSON Web Tokens (JWT)

---

## API Overview

### Authentication

-   `POST /auth/login`
-   `POST /auth/register`

### Departments

-   `GET /department`
-   `POST /department`
-   `GET /department/:id`
-   `PUT /department/:id`
-   `DELETE /department/:id/:cascadeOnDelete`

### Employees

-   `GET /employee`
-   `POST /employee`
-   `GET /employee/:id`
-   `PUT /employee/:id`
-   `DELETE /employee/:id`
-   `GET /employee/dept/:id`
