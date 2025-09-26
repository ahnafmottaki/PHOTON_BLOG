import { Request, Response, NextFunction } from "express";
const blockedPatterns = [
  /curl/i,
  /wget/i,
  /python-request/i,
  /Go-http-client/i,
  /Java/i,
  /sqlmap/i,
  /nmap/i,
  /Nikto/i,
  /HeadlessChrome/i,
  /PhantomJS/i,
];
const checkUserAgent = (req: Request, res: Response, next: NextFunction) => {
  const isBlocked = blockedPatterns.some((pattern) =>
    pattern.test(req.headers["user-agent"] || "")
  );
  if (isBlocked) {
    res.status(403).json({ message: "Forbidden: User-Agent blocked" });
    return;
  }
  next();
};

export default checkUserAgent;
