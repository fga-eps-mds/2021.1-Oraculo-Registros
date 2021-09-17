const app = require("../src/index");
const request = require("supertest");

test("Test routes related to processes", async () => {
	const r1 = await request(app).get("/processos");
	const r2 = await request(app).get("/processos/0");
	const r3 = await request(app).post("/processos");

	expect(r1.statusCode).toBe(401);
	expect(r2.statusCode).toBe(401);
	expect(r3.statusCode).toBe(401);
});
