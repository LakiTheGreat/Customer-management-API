import request from "supertest";
import mongoose from "mongoose";

import app from "../src/app";
import { mongooseObj } from "../src/config";
import { ROUTES } from "../src/constants";

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

    tempId = response.body.data._id;

    expect(response.status).toBe(200);

    expect(response.body.data).toMatchObject({
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

    expect(response.status).toBe(200);

    expect(response.body.data[0]).toMatchObject({
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
    expect(response.status).toBe(200);

    expect(response.body.data).toMatchObject({
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
    expect(response.body.data).toMatchObject({
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

    expect(response.status).toBe(200);

    expect(response.body.data).toMatchObject({
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
    expect(response.status).toBe(404);

    expect(response.body.data).toEqual([]);
  });

  it("GET one customer - wrong ID format", async () => {
    const response = await request(app).get(`/v1/${ROUTES.CUSTOMERS}/1111`);
    expect(response.status).toBe(400);

    expect(response.body.data).toEqual([]);
  });

  it("PATCH one customer - non existant ID", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/${wrongId}`)
      .send({ firstName: "PatchedTestName" });
    expect(response.status).toBe(404);

    expect(response.body.data).toEqual([]);
  });

  it("PATCH one customer - wrong ID format", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/$111`)
      .send({ firstName: "PatchedTestName" });
    expect(response.status).toBe(400);

    expect(response.body.data).toEqual([]);
  });

  it("DELETE one customer - non existant ID", async () => {
    const response = await request(app).patch(
      `/v1/${ROUTES.CUSTOMERS}/delete/${wrongId}`
    );

    expect(response.status).toBe(404);

    expect(response.body.data).toEqual([]);
  });

  it("DELETE one customer - wrong ID format", async () => {
    const response = await request(app).patch(
      `/v1/${ROUTES.CUSTOMERS}/delete/111`
    );

    expect(response.status).toBe(400);

    expect(response.body.data).toEqual([]);
  });
});
