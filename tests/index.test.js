const app = require("../src");
const request = require("supertest");
const { initializeDatabase } = require("../src/Database");
const express = require("express");
const { describe } = require("../src/Model/Record");

const validRecord1 = {
  register_number: "123121776555673",
  inclusion_date: "14/04/2021",
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
  situation: 2,
  created_by: 3,
};

const validRecord2 = {
  register_number: "123121776555673",
  inclusion_date: "14/04/2021",
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
  created_by: 1,
};

const invalidRecord1 = {
  register_number: "123121776555673",
  inclusion_date: "14/04/2021",
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
  created_by: -50,
};

const invalidRecord2 = {
  register_number: "123121776555673",
  inclusion_date: "14/04/2021",
  city: null,
  state: "bahia",
  requester: "policia civil",
  document_type: "fisico",
  document_number: "1020304050",
  document_date: null,
  description: "ABCDEFGHIJKL",
  sei_number: null,
  receipt_form: "form",
  contact_info: null,
  situation: 2,
  created_by: 2,
};

const emptyRecord = {};

const user = {
  name: "tester",
  email: "tester@email.com",
};

const tag = {
  name: "Tag One",
  color: "#ff0000",
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
    expect(res.statusCode).toEqual(500);
  });

  it("POST /records - should get all registered records", async () => {
    const res = await request(app).get("/records");
    expect(res.statusCode).toEqual(200);
  });

  it("POST /records/:id - should return a record", async () => {
    const res = await request(app).get(`/records/${last_record_id}`);
    expect(res.statusCode).toEqual(200);
  });

  it("POST /records - test with invalid created_by", async () => {
    const res = await request(app).post("/records").send(invalidRecord1);
    expect(res.statusCode).toEqual(500);
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
      forwarded_by: 1,
    };

    const res = await request(app).post("/records/1/forward").send(payload);
    expect(res.statusCode).toEqual(200);
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
      situation: 1,
    });

    expect(res.statusCode).toEqual(200);
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
    const res = await request(app).post("/tag/new").send(tag);
    expect(res.statusCode).toEqual(200);
  });
});

afterAll((done) => {
  done();
});
