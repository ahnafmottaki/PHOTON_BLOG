import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types";

const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => void | Promise<void>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const withAuth = (
  fn: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!("user" in req)) {
      throw new Error("this handler for authenticated controllers");
    }
    Promise.resolve(fn(req as AuthenticatedRequest, res, next)).catch(next);
  };
};

export default asyncHandler;
export { withAuth };
