const request = require("supertest");
const app = require("../../src/app");

describe("Todo validation", () => {
  it("returns 400 if title is missing", async () => {
    const res = await request(app).post("/api/todos").send({});
    expect(res.statusCode).toBe(400);
  });
});
