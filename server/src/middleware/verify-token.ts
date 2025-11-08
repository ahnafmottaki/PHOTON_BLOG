import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AuthenticatedRequest } from "../types";

export const verifyToken = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
      );
    }
    try {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as any;
      (req as AuthenticatedRequest).user = payload;
      next();
    } catch (err) {
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
      );
    }
  }
);
