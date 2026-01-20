const request = require("supertest");
const app = require("../../src/app");
const Todo = require("../../src/models/todo.model");

describe("Todo API", () => {
  it("POST /api/todos → creates a new todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ title: "Test todo" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test todo");
    expect(res.body.completed).toBe(false);
  });

  it("GET /api/todos → returns all todos", async () => {
    await Todo.create({ title: "Todo 1" });
    await Todo.create({ title: "Todo 2" });

    const res = await request(app).get("/api/todos");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("PUT /api/todos/:id → updates a todo", async () => {
    const todo = await Todo.create({ title: "Old title" });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("DELETE /api/todos/:id → deletes a todo", async () => {
    const todo = await Todo.create({ title: "To delete" });

    const res = await request(app).delete(`/api/todos/${todo._id}`);

    expect(res.statusCode).toBe(204);

    const exists = await Todo.findById(todo._id);
    expect(exists).toBeNull();
  });
});
