import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";

import { router } from "./routes";
import { JSEND_STATUS } from "./constants";
import jSendResponse from "./config/jSendResponse";

const app = express();

// 1) Allows the use of .env file and process.env variable
dotenv.config({
  path: ".env",
});

// 2) Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev")); //logs request data in terminal
app.use(express.json()); //allows the use of .body in requst (req.body)

// 3) Routes
app.use("/v1", router);

// 4) Unknown route
app.all("*", (req, res, next) => {
  res
    .status(404)
    .json(
      jSendResponse({
        status: JSEND_STATUS.FAIL,
        message: `Can't find ${req.originalUrl}route`,
      })
    );
});

export default app;
