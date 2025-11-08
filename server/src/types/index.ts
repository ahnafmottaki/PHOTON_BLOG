import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedUser {
  user: JwtPayload & {
    id: string;
    username: string;
    email: string;
    role: "admin" | "user";
  };
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
