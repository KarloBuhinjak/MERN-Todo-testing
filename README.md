# MERN Todo App – Testing Focused Project

This project is a **full-stack MERN Todo application** with a **strong focus on automated testing**.  
It demonstrates how to test a REST API on the backend and real user behavior on the frontend.

The project was built to showcase:
- Backend API testing using **Jest + Supertest**
- Frontend End-to-End (E2E) testing using **Cypress**
- A complete testing strategy across the MERN stack

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Server (Backend)](#server-backend)
  - [Setup](#setup)
  - [API Endpoints](#api-endpoints)
  - [Backend Testing](#testing)
  - [Run Server Tests](#run-server-tests)
  - [Test Reports](#test-reports)
- [Client (Frontend)](#client-frontend)
  - [Client Setup](#client-setup)
  - [Frontend Testing with Cypress](#frontend-testing-with-cypress)
  - [Cypress Test Scenarios](#cypress-test-scenarios)
    - [1. Add Todo](#1-add-todo)
    - [2. Delete Todo](#2-delete-todo)
    - [3. Mark Todo as Completed](#3-mark-todo-as-completed)
  - [Notes on Frontend Testing](#notes-on-frontend-testing)
  - [Running Cypress Tests](#running-cypress-tests)
  - [Frontend Testing Strategy](#frontend-testing-strategy)
  - [Cypress Test Videos](#cypress-test-videos)

---

## Project Overview

The MERN Todo App allows users to:
- Create todos
- Mark todos as completed
- Delete todos
- Persist data in MongoDB

The main goal of this project is **testing**, not UI design.  
Both backend and frontend are covered with automated tests to ensure correctness and reliability.

---

## Project Structure

```text
mern-todo-testing/
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── config/
│   │   ├── services/
│   │   └── controllers/
│   └── tests/
├── client/
│   ├── src/
│   └── cypress/
│       └── e2e/
└── README.md
```

---

## Server (Backend)

### Setup

```bash
cd server
npm install
npm start
```

### API Endpoints

| Method | Route            | Description          |
|--------|------------------|----------------------|
| GET    | /api/todos       | Get all todos        |
| POST   | /api/todos       | Create a new todo    |
| PUT    | /api/todos/:id   | Update a todo        |
| DELETE | /api/todos/:id   | Delete a todo        |

### Testing

#### Server Tests

The server is tested using:

- **Jest** – test runner
- **Supertest** – HTTP request simulation

Test coverage includes:

- Unknown routes → return `404`
- Todo CRUD operations:
  - `POST /api/todos` → create a new todo
  - `GET /api/todos` → return all todos
  - `PUT /api/todos/:id` → update a todo
  - `DELETE /api/todos/:id` → delete a todo
- Error handling:
  - Fetching a non-existing todo → `404`
- Validation:
  - Creating a todo without a title → `400`

**Example test (create todo):**

```js
const request = require("supertest");
const app = require("../../src/app");

describe("Todo API", () => {
  it("POST /api/todos → creates a new todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ title: "Test todo" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test todo");
    expect(res.body.completed).toBe(false);
  });
});
```
### Run server tests

```bash
cd server
npm test
```
<img width="710" height="217" alt="Screenshot 2026-01-19 at 23 15 47" src="https://github.com/user-attachments/assets/b17086fe-bfd1-4185-a0dd-df33fcdbabb7" />

### Test Reports

The backend server tests generate reports that show test results and coverage.  
You can generate **coverage reports** using Jest:

```bash
cd server
npm test -- --coverage
```
<img width="714" height="478" alt="Screenshot 2026-01-20 at 12 09 21" src="https://github.com/user-attachments/assets/f4921529-f3e7-430b-a18e-017d6204efa9" />

This will create a `coverage/` folder in your server directory, which contains detailed HTML and JSON reports of the backend test coverage.  

#### Viewing Jest Coverage Report

You can open the HTML coverage report in your browser:

```bash
open coverage/lcov-report/index.html
```
<img width="1722" height="1224" alt="Screenshot 2026-01-19 at 23 15 26" src="https://github.com/user-attachments/assets/6639281d-e677-4740-b6d6-ddd0b447214f" />

<img width="1720" height="527" alt="Screenshot 2026-01-20 at 12 10 04" src="https://github.com/user-attachments/assets/5163004f-388d-4624-86aa-1fc79414a874" />


This report will show:

- **File coverage** – which files are fully or partially covered by tests  
- **Statements, functions, branches, and lines coverage** – percentages of code tested  
- **Untested lines** – highlighted in red for easy identification 

## Client (Frontend)

The client side of this project is a **React application** built with **Vite**.  
The primary focus on the client is **End-to-End (E2E) testing** using **Cypress**.

The frontend communicates with the backend REST API and allows users to manage todos through a simple UI.

---


### Client Setup

```bash
cd client
npm install
npm run dev
```

## Frontend Testing with Cypress

Frontend testing is implemented using **Cypress**, an end-to-end testing framework that simulates **real user behavior in a real browser**.

Cypress tests verify that:
- UI elements render correctly
- User interactions work as expected
- Frontend correctly communicates with the backend API
- Core user flows do not break

---

## Why Cypress?

Cypress was chosen because it:
- Runs tests in a real browser
- Interacts directly with the DOM
- Requires no mocking of UI behavior
- Is widely used in modern frontend testing

This ensures the application works **from the user's perspective**.

---

## Cypress Test Scenarios

### 1. Add Todo

This test verifies that a user can add a new todo using the input form.

```javascript
describe("Todo App", () => {
  it("adds a new todo", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="New todo"]').type("Test todo");
    cy.contains("Add").click();

    cy.contains("Test todo").should("exist");
  });
});
```
### 2. Delete Todo

This test verifies that a user can delete an existing todo from the list.

```javascript
describe("Delete Todo", () => {
  it("deletes a todo", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="New todo"]').type("Delete me");
    cy.contains("Add").click();

    cy.contains("Delete me")
      .parent()
      .find("button")
      .click();

    cy.contains("Delete me").should("not.exist");
  });
});
```
---

### 3. Mark Todo as Completed

This test verifies that a user can mark a todo as completed, which toggles the checkbox and updates the UI.

```javascript
describe("Mark Todo as Completed", () => {
  it("marks a todo as completed", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="New todo"]').type("Complete me");
    cy.contains("Add").click();

    cy.contains("Complete me")
      .parent()
      .find('input[type="checkbox"]')
      .check()
      .should("be.checked");
  });
});
---
```

### Notes on Frontend Testing

- Cypress tests validate **real user interactions** in the browser.
- The tests ensure the UI updates correctly and communicates properly with the backend.
- Each test is **independent** and can be re-run without relying on previous tests.
- The tests cover **core user flows**: adding, deleting, and completing todos.

---

### Running Cypress Tests

To open the interactive Cypress test runner:

```bash
cd client
npx cypress open
```
> ⚠️ Ensure the backend server is running (npm start in /server) before running Cypress tests.

---

To run tests in headless mode (useful for CI/CD pipelines):

```bash
cd client
npx cypress run
```

---

### Frontend Testing Strategy

- **Add Todo** → verifies that a user can add a new todo using the input form and see it appear in the list.
- **Delete Todo** → verifies that a user can delete an existing todo and that the UI updates correctly.
- **Mark Todo as Completed** → verifies toggling a todo as completed via the checkbox, updating the UI state.
- Tests simulate **real user behavior** to ensure frontend reliability.
- Tests communicate with the **actual backend API**, providing true end-to-end verification.

---
## Cypress Test Videos

Below are demonstration videos of the **Cypress E2E tests** running in the frontend.  
Each video corresponds to a core user interaction: adding, deleting, and marking todos as completed.

---

### 1. Add Todo

This video demonstrates adding a new todo using the input form.  

[Watch Add Todo Video](https://github.com/user-attachments/assets/476c0adc-5084-4d7e-b8b3-beaf938a5e55)

---

### 2. Delete Todo

This video demonstrates deleting an existing todo from the list.  

[Watch Delete Todo Video](https://github.com/user-attachments/assets/20842786-a8ee-4ad1-87b1-a8ba555198a6)

---

### 3. Mark Todo as Completed

This video demonstrates marking a todo as completed, toggling the checkbox and updating the UI.  

[Watch Mark Todo Video](https://github.com/user-attachments/assets/58649d70-4fd6-4933-ae31-ccb803532b77)

---










