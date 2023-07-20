import request from "supertest";
import mongoose from "mongoose";

import app from "../src/app";
import { mongooseObj } from "../src/config";
import { ROUTES } from "../src/constants";

// Connect to the test database before running the tests
beforeAll(async () => {
  await mongoose.connect(mongooseObj.url, mongooseObj.options_test);
});

// Disconnect from the test database after running all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("API endpoint testing", () => {
  it("GET all customers", async () => {
    const response = await request(app).get(`/v1/${ROUTES.CUSTOMERS}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject([{ id: expect.any(String) }]); // Add your expected response data here
  });
});
