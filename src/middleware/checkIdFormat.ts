import { NextFunction, Request, Response } from "express";
import { JSEND_STATUS } from "../constants";

export default function checkIdFormat(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  // Regular expression to match MongoDB ObjectId format
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;

  if (!id || !objectIdPattern.test(id)) {
    return res.status(400).json({
      status: JSEND_STATUS.FAIL,
      message: "Invalid 'id' format",
      data: [],
    });
  }
  next();
}
