import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import httpStatus from "http-status";

import ApiError from "../config/ApiError";

export const checkIdFormat = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!ObjectId.isValid(req.params.id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid 'id' format");
  }
  next();
};
