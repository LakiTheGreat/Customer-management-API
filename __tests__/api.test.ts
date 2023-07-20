import request from "supertest";
import mongoose from "mongoose";

import app from "../src/app";
import { mongooseObj } from "../src/config";
import { ROUTES } from "../src/constants";

let tempId = "";

// Connect to the test database before running the tests
beforeAll(async () => {
  await mongoose.connect(mongooseObj.url, mongooseObj.options_test);
});

// Disconnect from the test database after running all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("API endpoint testing", () => {
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
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      contactNumber: expect.any(String),
      deleted: false,
      __v: expect.any(Number),
    });
  });

  it("GET all customers", async () => {
    const response = await request(app).get(`/v1/${ROUTES.CUSTOMERS}`);
    expect(response.status).toBe(200);
    expect(response.body.data[0]).toMatchObject({
      _id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      contactNumber: expect.any(String),
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
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      contactNumber: expect.any(String),
      deleted: false,
    });
  });

  it("PATCH one customer", async () => {
    const response = await request(app)
      .patch(`/v1/${ROUTES.CUSTOMERS}/${tempId}`)
      .send({ firstName: "New test name" });
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      _id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      contactNumber: expect.any(String),
      deleted: false,
    });
  });

  it("DELETE one customer", async () => {
    const response = await request(app).patch(
      `/v1/${ROUTES.CUSTOMERS}/delete/${tempId}`
    );
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      _id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      contactNumber: expect.any(String),
      deleted: true,
    });
  });
});
