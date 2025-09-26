import type { NextFunction, Request, Response } from "express";
import SessionManager from "../class/SessionManager";
import { errorResponse } from "../utils/Error";

const sessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenId = req.cookies?.token;
  if (!tokenId) {
    res.status(404).json({
      success: false,
      message: "Invalid Token Id",
    });
    return;
  }
  try {
    const sessions = await SessionManager.getAllSessions();
    if (sessions.has(tokenId)) {
      next();
      return;
    }
    res.status(401).json({
      success: false,
      message: "UnAuthenticated User",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

export default sessionMiddleware;
