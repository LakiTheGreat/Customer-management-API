import { NextFunction, Request, Response } from "express";
import { JSEND_STATUS } from "../constants";

export const checkPatchRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const attributesToCheck = ["firstName", "lastName", "contactNumber", "email"];

  const hasAtLeastOneAttribute = attributesToCheck.some((attribute) =>
    req.body.hasOwnProperty(attribute)
  );

  if (!hasAtLeastOneAttribute) {
    return res.status(400).json({
      status: JSEND_STATUS.FAIL,
      message:
        "At least one of the attributes must be provided: firstName, lastName, email or contactNumber.",
      data: [],
    });
  }

  next();
};
