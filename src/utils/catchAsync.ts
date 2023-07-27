import { NextFunction, Request, Response } from 'express';

export const catchAsync =
  (handler: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch((err) => next(err));
  };
