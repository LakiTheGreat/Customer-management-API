import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import httpStatus from "http-status";

import ApiError from "../config/ApiError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ statusCode: err.statusCode, message: err.message });
  } else if (err instanceof mongoose.Error.ValidationError) {
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      message: err.message,
    });
  }
  console.log("err", err);
  return res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || "error",
  });
};
