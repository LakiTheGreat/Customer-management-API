import mongoose from "mongoose";

import app from "./app";
import { mongooseObj } from "./config";

mongoose.connect(mongooseObj.url, mongooseObj.options).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}...`);
  });
});
