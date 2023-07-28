import mongoose from "mongoose";

import app from "./app";
import { mongooseObj } from "./config";
import { logger } from "./config/logger";

mongoose.connect(mongooseObj.url, mongooseObj.options).then(() => {
  logger.info("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    logger.info(`App running on port ${process.env.PORT}...`);
    logger.info("API DOCUMENTATION: 🚩 http://localhost:3000/api-docs 🚩");
  });
});
