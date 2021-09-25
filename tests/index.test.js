const app = require("../src");

test("Test express server app", (done) => {
	expect(app).toBeDefined();
	done();
});
