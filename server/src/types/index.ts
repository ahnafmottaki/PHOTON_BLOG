import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type AuthenticatedUser = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
} & JwtPayload;

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
