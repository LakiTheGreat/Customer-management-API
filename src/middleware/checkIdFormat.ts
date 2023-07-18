import { NextFunction, Request, Response } from "express";

export default function checkIdFormat(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  // Regular expression to match only numeric strings
  const numericPattern = /^\d+$/;

  if (!id || !numericPattern.test(id)) {
    return res
      .status(400)
      .json({ error: "Invalid 'id' format. 'id' must be a valid number." });
  }
  next();
}
