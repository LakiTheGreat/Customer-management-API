import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../src/config/swagger.json";
import { router } from "./routes";
import ApiError from "./config/ApiError";
import httpStatus from "http-status";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

//1) Adds swagger documentation and endpoint to http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 2) Allows the use of .env file and process.env variable
dotenv.config({
  path: ".env",
});

// 3) Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev")); //logs request data in terminal
app.use(express.json()); //allows the use of .body in requst (req.body)

// 4) Routes
app.use("/v1", router);

// 5) Unknown route
app.all("*", (req, res, next) => {
  throw new ApiError(
    httpStatus.NOT_FOUND,
    `Can't finde route: ${req.originalUrl}`
  );
});

//6) Error handling middlware
app.use(errorHandler);

export default app;
