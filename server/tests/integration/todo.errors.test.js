const request = require("supertest");
const app = require("../../src/app");

describe("Todo API errors", () => {
  it("returns 404 for non-existing todo", async () => {
    const res = await request(app).get("/api/todos/507f191e810c19729de860ea");
    expect(res.statusCode).toBe(404);
  });
});
