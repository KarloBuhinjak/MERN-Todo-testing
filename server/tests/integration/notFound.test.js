const request = require("supertest");
const app = require("../../src/app");

describe("Unknown route", () => {
  it("returns 404 for unknown route", async () => {
    const res = await request(app).get("/doesnotexist");
    expect(res.statusCode).toBe(404);
  });
});
