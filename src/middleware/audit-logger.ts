import { Request, Response, NextFunction } from "express";
import AuditLogger from "../class/AuditLogger";

const auditLogger = (req: Request, res: Response, next: NextFunction) => {
  const logEntry = AuditLogger.getLogEntry(req);
  AuditLogger.logEntryToFile(logEntry);
  next();
};

export default auditLogger;
