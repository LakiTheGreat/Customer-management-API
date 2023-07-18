//Middleware imports
import express from "express";
import morgan from "morgan";
import { router } from "./routes";

const app = express();

// 1) Middlewares
app.use(morgan("dev")); //logs req data in terminal
app.use(express.json()); //add body to req
app.use("/v1", router);

export default app;
