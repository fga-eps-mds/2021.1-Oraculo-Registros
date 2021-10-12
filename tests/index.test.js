const app = require("../src");
const request = require("supertest");
const { initializeDatabase } = require("../src/Database");
const express = require("express");

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

const emptyRecord = {};

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
});

afterAll((done) => {
  done();
});
