import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err) {
    next(err);
  }
};
