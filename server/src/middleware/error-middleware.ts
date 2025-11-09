import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { MongoServerError } from "mongodb";
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
  console.log(error);

  if (isAppError(error)) {
    statusCode = error.statusCode;
    response.message = error.message;
  }
  res.status(statusCode).json(response);
};

export default errorMiddleware;
