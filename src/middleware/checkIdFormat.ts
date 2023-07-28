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
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "Invalid 'id' format");
  }
  next();
};
