import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import ApiError from "../config/ApiError";

export const checkPatchRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedAttributes = ["firstName", "lastName", "contactNumber", "email"];
  const requestBodyKeys = Object.keys(req.body);

  // Check if all properties in req.body are either in the allowedAttributes array or not present
  const hasOnlyAllowedAttributes = requestBodyKeys.every((attribute) =>
    allowedAttributes.includes(attribute)
  );

  if (!hasOnlyAllowedAttributes) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid attributes provided. Only firstName, lastName, email, or contactNumber are allowed."
    );
  }

  next();
};
