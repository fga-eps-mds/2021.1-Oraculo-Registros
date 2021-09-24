const request = require("supertest");
const app = require("../src/index");

describe("Test processes routes", () => {
	it("GET /processos", async () => {
		const r1 = await request(app).get("/processos");
		expect(r1.statusCode).toEqual(401);
	});

	it("GET /processos/0", async () => {
		const r2 = await request(app).get("/processos/0");
		expect(r2.statusCode).toEqual(401);
	});

	it("POST /processos", async () => {
		const r3 = await request(app).post("/processos");
		expect(r3.statusCode).toEqual(401);
	});
});
