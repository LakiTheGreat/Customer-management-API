import { NextFunction, Request, Response } from "express";
import { JSEND_STATUS } from "../constants";
import jSendResponse from "../config/jSendResponse";

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
    return res.status(400).json(
      jSendResponse({
        status: JSEND_STATUS.FAIL,
        message:
          "Invalid attributes provided. Only firstName, lastName, email, or contactNumber are allowed.",
      })
    );
  }

  next();
};
