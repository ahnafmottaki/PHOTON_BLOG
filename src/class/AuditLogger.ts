import fs from "fs/promises";
import path from "path";
import { Request } from "express";

type LogEntry = ReturnType<typeof AuditLogger.getLogEntry>;

class AuditLogger {
  static getLogEntry(req: Request) {
    return {
      timeStamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      headers: {
        "user-agent": req.headers["user-agent"] || "",
        authorization: req.headers["authorization"] || "",
        referer: req.headers["referer"] || "",
        origin: req.headers["origin"] || "",
        "accept-language": req.headers["accept-language"] || "",
        "content-type": req.headers["content-type"] || "",
      },
    };
  }

  static logFilePath() {
    return path.resolve(__dirname, "../data/logEntry.json");
  }

  static async logEntryToFile(logEntry: LogEntry) {
    const logFilePath = AuditLogger.logFilePath();
    try {
      const data = await fs.readFile(logFilePath, "utf8");
      const logEntries: LogEntry[] = JSON.parse(data);
      logEntries.push(logEntry);
      await fs.writeFile(logFilePath, JSON.stringify(logEntries, null, 2));
    } catch (err) {
      console.error("Error writing log file:", err);
    }
  }
}
export default AuditLogger;
