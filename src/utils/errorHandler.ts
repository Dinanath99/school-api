import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {

    if (error instanceof ZodError) {
    const errorDetails = error.errors.map((err: any) => ({
      field: err.path.join(".")? err.path.join(".") :"required field",
      message: err.message,
    }));
   
    return res.status(400).send({ success: false, errors: errorDetails });
  }
  return res.status(500).send({ success: false, message: error.message });
}