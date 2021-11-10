const app = require("../src");
const request = require("supertest");
const { initializeDatabase } = require("../src/Database");

const validRecord1 = {
  city: "df",
  state: "bahia",
  requester: "policia federal",
  document_type: "e-mail",
  document_number: "10/04/2021",
  document_date: "15/04/2021",
  description: "ABCDEFGHIJKL",
  sei_number: "1234",
  receipt_form: "form",
  contact_info: "info@gmail.com",
  created_by: "william@pcgo.com",
};

const validRecord2 = {
  city: "df",
  state: "bahia",
  requester: "policia civil",
  document_type: "fisico",
  document_number: "1020304050",
  document_date: "15/04/2021",
  description: "ABCDEFGHIJKL",
  sei_number: "1234",
  receipt_form: "form",
  contact_info: "info@gmail.com",
  situation: 2,
  created_by: "william@pcgo.com",
};

const invalidRecord1 = {
  city: "df",
  state: "bahia",
  requester: "policia civil",
  document_type: "fisico",
  document_number: "1020304050",
  document_date: "15/04/2021",
  description: "ABCDEFGHIJKL",
  sei_number: "1234",
  receipt_form: "form",
  contact_info: "info@gmail.com",
  created_by: -50,
};

const emptyRecord = {};

const user = {
  name: "tester",
  email: "tester@email.com",
  section_id: 1,
};

const tag1 = {
  name: "Tag One",
  color: "#ab1111",
};

const tag2 = {
  name: "Tag Two",
  color: "#ac1212",
};

const tagCopy = {
  name: "Tag One",
  color: "#ab1111",
};

describe("Sub Test", () => {
  const test1 = 1;
  const test2 = 2;
  const { loadEnvironment } = require("../src/Database");

  it("Test empty database URL", (done) => {
    const result = loadEnvironment(test1);
    expect(result).toBe(null);
    done();
  });

  it("Test PROD environment var", (done) => {
    const result = loadEnvironment(test2);
    expect(result.dialectOptions).toBeDefined();
    done();
  });
});

describe("Main test", () => {
  let last_record_id = 0;

  beforeAll(async () => {
    await initializeDatabase();
  });

  it("Test express server app", (done) => {
    expect(app).toBeDefined();
    done();
  });

  it("GET /records - should not return any records", async () => {
    const res = await request(app).get("/records");
    expect(res.statusCode).toEqual(204);
  });

  it("GET /count/records - should raise a error", async () => {
    const res = await request(app).get("/count/records");
    expect(res.statusCode).toEqual(204);
  });

  it("GET /records/page/0 - should not return any records", async () => {
    const res = await request(app).get("/records/page/0");
    console.log(`data: ${JSON.stringify(res.body)}`);
    expect(res.statusCode).toEqual(204);
  });

  it("POST /records - should create a record", async () => {
    const res = await request(app).post("/records").send(validRecord1);
    last_record_id = res.body.id;
    expect(res.statusCode).toBe(200);
  });

  it("POST /records - should create a record", async () => {
    const res = await request(app).post("/records").send(validRecord2);

    expect(res.statusCode).toBe(200);
  });

  it("POST /records - should not create a record", async () => {
    const res = await request(app).post("/records").send(emptyRecord);
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBeDefined();
  });

  it("POST /records - should get all registered records", async () => {
    const res = await request(app).get("/records");
    expect(res.statusCode).toEqual(200);
  });

  it("POST /records/:id - should return a record", async () => {
    const res = await request(app).get(`/records/${last_record_id}`);
    expect(res.statusCode).toEqual(200);
  });

  it("POST /records - should not create a record (inexistent created_by)", async () => {
    const res = await request(app).post("/records").send(invalidRecord1);
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBeDefined();
  });

  it("GET /records/page/0 - should return at least one record", async () => {
    const res = await request(app).get("/records/page/0");
    expect(res.statusCode).toEqual(200);
  });

  it("GET /records/page/-1 - should not return any records (invalid page)", async () => {
    const res = await request(app).get("/records/page/-1");
    expect(res.statusCode).toEqual(500);
  });

  it("POST /records/1/forward - should forward a record", async () => {
    const payload = {
      destination_id: 2,
      origin_id: 2,
      forwarded_by: "william@pcgo.com",
    };

    const res = await request(app).post("/records/1/forward").send(payload);
    expect(res.statusCode).toEqual(200);
  });

  it("POST /records/1/forward - should not forward a record (section mismatch)", async () => {
    const payload = {
      destination_id: 2,
      origin_id: 3,
      forwarded_by: "william@pcgo.com",
    };

    const res = await request(app).post("/records/1/forward").send(payload);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeDefined();
  });

  it("POST /records/500/forward - should not forward (inexistent)", async () => {
    const section = {
      destination_id: 3,
      origin_id: 2,
      forwarded_by: 1,
    };
    const res = await request(app).post("/records/500/forward").send(section);
    expect(res.statusCode).toEqual(404);
  });

  it("POST /records/1/forward - should not forward (invalid section)", async () => {
    const invalid = '\
            {"section_id":"invalid"}   \
        ';
    const res = await request(app).post("/records/500/forward").send(invalid);
    expect(res.statusCode).toEqual(400);
  });

  it("GET /records/1/sections - should return section history", async () => {
    const res = await request(app).get("/records/1/sections");
    expect(res.statusCode).toEqual(200);
  });

  it("GET /records/500/sections - should not return (inexistent record)", async () => {
    const res = await request(app).get("/records/500/sections");
    expect(res.statusCode).toEqual(404);
  });

  it("GET /records/500 - should not return a inexistent record", async () => {
    const res = await request(app).get("/records/500");
    expect(res.statusCode).toEqual(404);
  });

  it("POST /records/1/status - should update record situation", async () => {
    const res = await request(app).post("/records/1/status").send({
      situation: "finished",
    });

    expect(res.statusCode).toEqual(200);
  });

  it("POST /records/1/status - should not update record situation", async () => {
    const res = await request(app).post("/records/1/status").send({
      situation: "situation123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeDefined();
  });

  it("POST /records/500/status - should not update record situation (inexistent record)", async () => {
    const res = await request(app).post("/records/500/status").send({
      situation: "pending",
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBeDefined();
  });

  it("GET /records/fields - should return all fields", async () => {
    const res = await request(app).get("/records/fields");
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name).toBeDefined();
    expect(res.body[0].description).toBeDefined();
    expect(res.body[0].created_by).toBeDefined();
  });

  it("POST /users - should create a user", async () => {
    const res = await request(app).post("/users").send(user);
    expect(res.statusCode).toEqual(200);
  });

  it("POST /users - should not create a user (already exists)", async () => {
    const res = await request(app).post("/users").send(user);
    expect(res.statusCode).toEqual(500);
  });

  it("GET /records/1/history - should return history for specified record", async () => {
    const res = await request(app).get("/records/1/history");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("GET /records/500/history - should not return history for specified record (inexistent record)", async () => {
    const res = await request(app).get("/records/500/history");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeDefined();
  });

  it("GET /records/1/current-section - should return the current section of a record", async () => {
    const res = await request(app).get("/records/1/current-section");
    expect(res.statusCode).toEqual(200);
    expect(res.body.current_section).toBeDefined();
  });
  it("GET /count/records - should return some records", async () => {
    const res = await request(app).get("/count/records");
    expect(res.statusCode).toEqual(200);
  });

  it("GET /records/department/500 - should not find department", async () => {
    const res = await request(app).get("/records/department/500");
    expect(res.statusCode).toEqual(404);
  });

  it("GET /records/department/2 - should return a empty list of records", async () => {
    const res = await request(app).get("/records/department/2");
    expect(res.statusCode).toEqual(200);
  });

  it("GET /records/department/3 - should return the records on department 3", async () => {
    const res = await request(app).get("/records/department/3");
    expect(res.statusCode).toEqual(204);
  });

  it("POST /tag/new - should create a new tag", async () => {
    const res = await request(app).post("/tag/new").send(tag1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("POST /tag/new - should not create a tag (color already exists)", async () => {
    const res = await request(app).post("/tag/new").send(tagCopy);
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toBeDefined();
  });

  it("GET /tags/all - should list all existing tags", async () => {
    const res = await request(app).get("/tags/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("POST /tag/:id/edit - should edit a specified tag", async () => {
    const res = await request(app).post("/tag/1/edit").send(tag2);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBeDefined();
  });

  it("GET /records/1/tags - should list tags of a record (empty tags)", async () => {
    const res = await request(app).get("/records/1/tags");
    expect(res.statusCode).toEqual(204);
  });

  it("POST /records/:id/add-tag - should add tag 1 to record 1", async () => {
    const res = await request(app).post("/records/1/add-tag").send({ tag_id: 1 });
    expect(res.statusCode).toEqual(200);
  });

  it("POST /records/:id/add-tag - should not add tag to record", async () => {
    const res = await request(app).post("/records/1/add-tag").send({ tag_id: 500 });
    expect(res.statusCode).toEqual(404);
  });

  it("POST /records/:id/edit - should edit a record", async () => {
    const res = await request(app).post("/records/1/edit").send({ city: "Goiania" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("POST /records/:id/edit - should edit a record", async () => {
    const res = await request(app).post("/records/a/edit").send({ city: "Goiania" });
    expect(res.statusCode).toEqual(500);
  });

  it("GET /user/by-mail/:email - should return user information", async () => {
    const res = await request(app)
      .get("/user/by-mail/william@pcgo.com");

    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toBeDefined();
    expect(res.body.section_id).toBeDefined();
    expect(res.body.name).toBeDefined();
  });

  it("GET /user/by-mail - should not return user information (inexistent user)", async () => {
    const res = await request(app).get("/user/by-mail/zzz@bol.com");

    expect(res.statusCode).toEqual(404);
  });

  it("POST /users - should not create a user (invalid email)", async () => {
    const res = await request(app).post("/users").send({
      name: "user",
      email: "user",
      section_id: 2,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("POST /records/:id/close - should not close a record (no reason)", async () => {
    // Atualiza o status do registro para "pending" antes de fazer os demais testes
    const res1 = await request(app).post("/records/1/status").send({
      situation: "pending",
    });

    expect(res1.statusCode).toEqual(200);

    const res = await request(app)
      .post("/records/1/close")
      .send({ closed_by: "william@pcgo.com" });

    expect(res.statusCode).toEqual(400);
  });

  it("POST /records/:id/reopen - should not reopen a record (no reason)", async () => {
    const res = await request(app)
      .post("/records/1/reopen")
      .send({ reopened_by: "william@pcgo.com" });

    expect(res.statusCode).toEqual(400);
  });

  it("POST /records/:id/close - should close a record", async () => {
    const res = await request(app)
      .post("/records/1/close")
      .send({ closed_by: "william@pcgo.com", reason: "any reason" });

    expect(res.statusCode).toEqual(200);
  });

  it("POST /records/:id/reopen - should reopen a record", async () => {
    const res = await request(app)
      .post("/records/1/reopen")
      .send({ reopened_by: "william@pcgo.com", reason: "any reason" });

    expect(res.statusCode).toEqual(200);
  });

  it("POST /records/:id/reopen - should not reopen a record (status already set)", async () => {
    const res = await request(app)
      .post("/records/1/reopen")
      .send({ reopened_by: "william@pcgo.com", reason: "any reason" });

    expect(res.statusCode).toEqual(400);
  });

  it("POST /records/:id/close - should not close (invalid field type)", async () => {
    const res = await request(app)
      .post("/records/1/close")
      .send({ closed_by: 1, reason: "any reason" });

    expect(res.statusCode).toEqual(500);
  });

  it("POST /records/:id/reopen - should not reopen (invalid field type)", async () => {
    const res = await request(app)
      .post("/records/1/reopen")
      .send({ reopened_by: 1, reason: "any reason" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBeDefined();
  });

  it("POST /records/:id/reopen - should not reopen (no user information)", async () => {
    // Atualiza o status do registro para "pending" antes de fazer os demais testes
    const res1 = await request(app).post("/records/1/status").send({
      situation: "pending",
    });

    expect(res1.statusCode).toEqual(200);

    const res = await request(app)
      .post("/records/1/reopen")
      .send({ reason: "any reason" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeDefined();
  });

  it("POST /records/:id/close - should not reopen (record not found)", async () => {
    const res = await request(app)
      .post("/records/500/close")
      .send({ reason: "any reason" });
    expect(res.statusCode).toEqual(404);
  });

  it("POST /records/:id/close - should not close (already closed)", async () => {
    // Atualiza o status do registro para "finished" antes de fazer os demais testes
    const res1 = await request(app).post("/records/1/status").send({
      situation: "finished",
    });

    expect(res1.statusCode).toEqual(200);

    const res = await request(app)
      .post("/records/1/reopen")
      .send({ closed_by: "william@pcgo.com", reason: "any reason" });

    expect(res.statusCode).toEqual(400);
  });

  it("GET /sections - should list get all existing sections", async () => {
    const res = await request(app).get("/sections");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("POST /tag/:id/edit - should not edit a tag (inexistent tag)", async () => {
    const res = await request(app).post("/tag/500/edit");
    expect(res.statusCode).toEqual(404);
  });
});

afterAll((done) => {
  done();
});
