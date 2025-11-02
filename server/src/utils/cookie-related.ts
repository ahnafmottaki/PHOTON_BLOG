import { CookieOptions } from "express";

const cookieSettingsForJWT: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 3600,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export { cookieSettingsForJWT };
