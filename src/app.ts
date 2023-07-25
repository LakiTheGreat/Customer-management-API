import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";

import { router } from "./routes";

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

export default app;
