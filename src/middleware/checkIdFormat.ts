import { NextFunction, Request, Response } from "express";

export default function checkIdFormat(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  // Regular expression to match only numerical strings
  const numericPattern = /^\d+$/;

  if (!id || !numericPattern.test(id)) {
    return res
      .status(400)
      .json({ message: "Invalid 'id' format. 'id' must be a valid number." });
  }
  next();
}
