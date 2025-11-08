import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
const isAppError = (model: Error | AppError): model is AppError => {
  return model instanceof AppError;
};
const errorMiddleware = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  const response = { success: false, message: "Server Error" };
  if (isAppError(error)) {
    console.log(error);
    statusCode = error.statusCode;
    response.message = error.message;
  }
  res.status(statusCode).json(response);
};

export default errorMiddleware;
