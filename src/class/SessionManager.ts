import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { Response } from "express";

interface Session {
  username: string;
  id: string;
  expiryTime: number;
}

class SessionManager {
  static async getAllSessions() {
    const sessionBuffer = await fs.readFile(SessionManager.getFilePath());
    const sessions = JSON.parse(sessionBuffer.toString());
    return new Map<string, Session>(sessions);
  }
  static getFilePath() {
    return path.resolve(__dirname, "../data/sessions.json");
  }

  static async createSession(data: Omit<Session, "expiryTime">) {
    const sessions = await SessionManager.getAllSessions();
    const tokenId = uuid();
    const expiryTime = SessionManager.getExpiryTime();
    sessions.set(tokenId, { ...data, expiryTime });
    await SessionManager.writeToFile(sessions);
    return [tokenId, SessionManager.sessionExpiresIn] as const;
  }

  static async createAndSetCookie(
    res: Response,
    data: Omit<Session, "expiryTime">
  ) {
    const [tokenId, expiresIn] = await SessionManager.createSession(data);
    res.cookie("token", tokenId, {
      httpOnly: true,
      maxAge: expiresIn,
    });
  }

  static async writeToFile(sessions: Map<string, Session>) {
    const sessionArray = Array.from(sessions);
    await fs.writeFile(
      SessionManager.getFilePath(),
      JSON.stringify(sessionArray)
    );
  }

  static async clearSessionAndCookie(res: Response, tokenId: string) {
    await SessionManager.clearASession(tokenId);
    res.clearCookie("token");
  }

  static async clearASession(tokenId: string) {
    const sessions = await SessionManager.getAllSessions();
    sessions.delete(tokenId);
    await SessionManager.writeToFile(sessions);
  }

  static async clearSessionPeriodically() {
    setInterval(async () => {
      const sessions = await SessionManager.getAllSessions();
      const newSessions = new Map(sessions);
      sessions.forEach(function (value, key) {
        if (value.expiryTime <= Date.now()) {
          newSessions.delete(key);
        }
      });
      await SessionManager.writeToFile(newSessions);
      console.log("clearing sessions");
    }, 1 * 60 * 1000);
  }

  static sessionExpiresIn = 1000 * 1 * 60;
  static getExpiryTime() {
    return SessionManager.sessionExpiresIn + Date.now();
  }
}

export default SessionManager;
