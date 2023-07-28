import request from "supertest";
import mongoose from "mongoose";
import httpStatus from "http-status";

import app from "../app";
import { mongooseObj } from "../config";
import { ROUTES } from "../constants/index";

let tempId = "";
let wrongId = "111111111111111111111111";

// Connect to the test database before running the tests
beforeAll(async () => {
  await mongoose.connect(mongooseObj.url, mongooseObj.options_test);
});

// Disconnect from the test database after running all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("API endpoint testing - status 200", () => {
  it("POST create customer", async () => {
    const newCustomer = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      contactNumber: "1234567890",
    };

    const response = await request(app)
      .post(`/v1/${ROUTES.CUSTOMERS}`)
      .send(newCustomer);

    tempId = response.body._id;

    expect(response.status).toBe(httpStatus.CREATED);

    expect(response.body).toMatchObject({
      _id: expect.any(String),
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      contactNumber: "1234567890",
      deleted: false,
      __v: expect.any(Number),
    });
  });

  it("GET all customers", async () => {
    const response = await request(app).get(`/v1/${ROUTES.CUSTOMERS}`);

    expect(response.status).toBe(httpStatus.OK);

    expect(response.body[0]).toMatchObject({
      _id: expect.any(String),
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      contactNumber: "1234567890",
      deleted: false,
      __v: expect.any(Number),
    });
  });

  it("GET one customer", async () => {
    const response = await request(app).get(
      `/v1/${ROUTES.CUSTOMERS}/${tempId}`
    );
    expect(response.status).toBe(httpStatus.OK);

    expect(response.body).toMatchObject({
      _id: expect.any(String),
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      contactNumber: "1234567890",
      deleted: false,
      __v: expect.any(Number),
    });
  });

  it("PATCH one customer", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/${tempId}`)
      .send({ firstName: "PatchedTestName" });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: tempId,
      firstName: "PatchedTestName",
      lastName: "Doe",
      email: "johndoe@example.com",
      contactNumber: "1234567890",
      deleted: false,
      __v: expect.any(Number),
    });
  });

  it("DELETE one customer", async () => {
    const response = await request(app).patch(
      `/v1/${ROUTES.CUSTOMERS}/delete/${tempId}`
    );

    expect(response.status).toBe(httpStatus.OK);

    expect(response.body).toMatchObject({
      _id: tempId,
      firstName: "PatchedTestName",
      lastName: "Doe",
      email: "johndoe@example.com",
      contactNumber: "1234567890",
      deleted: true,
      __v: expect.any(Number),
    });
  });
});

describe("API endpoint testing - status 4xx", () => {
  it("GET one customer - non existant ID", async () => {
    const response = await request(app).get(
      `/v1/${ROUTES.CUSTOMERS}/${wrongId}`
    );
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
  it("GET one customer - wrong ID format", async () => {
    const response = await request(app).get(`/v1/${ROUTES.CUSTOMERS}/1111`);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(response.body.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("PATCH one customer - non existant ID", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/${wrongId}`)
      .send({ firstName: "PatchedTestName" });
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
  it("PATCH one customer - wrong ID format", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/$111`)
      .send({ firstName: "PatchedTestName" });
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(response.body.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("PATCH one customer - invalid request (wrong field name)", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/${tempId}`)
      .send({ name: "PatchedTestName" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.statusCode).toEqual(httpStatus.BAD_REQUEST);
  });
  it("PATCH one customer - invalid request (additional field with wrong name)", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/${tempId}`)
      .send({ firstName: "PatchedTestName", nameLast: "John" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.statusCode).toEqual(httpStatus.BAD_REQUEST);
  });
  it("DELETE one customer - non existant ID", async () => {
    const response = await request(app).patch(
      `/v1/${ROUTES.CUSTOMERS}/delete/${wrongId}`
    );
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
  it("DELETE one customer - wrong ID format", async () => {
    const response = await request(app).patch(
      `/v1/${ROUTES.CUSTOMERS}/delete/111`
    );
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(response.body.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
