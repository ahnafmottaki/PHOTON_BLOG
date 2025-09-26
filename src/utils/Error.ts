import { Response } from "express";
const isError = (error: any): error is Error => {
  return error instanceof Error;
};

const errorResponse = (res: Response, error: any) => {
  if (isError(error)) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { errorResponse };
