import { NextFunction, Request, Response } from "express";

export default function checkIdFormat(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  // Regular expression to match MongoDB ObjectId format
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;

  if (!id || !objectIdPattern.test(id)) {
    return res
      .status(400)
      .json({ message: "Invalid 'id' format. 'id' must be a valid number." });
  }
  next();
}
