import path from "path";
import fsPromises from "fs/promises";
import writeToFile from "../utils/file-system";
import bcrypt from "bcrypt";
import type { Response } from "express";

export interface User {
  id: string;
  username: string;
  password: string;
  age: number;
  address: string;
}

class Auth {
  static async getAllUsers() {
    const usersBuffer = await fsPromises.readFile(Auth.getFilePath());
    return JSON.parse(usersBuffer.toString()) as User[];
  }

  static getFilePath() {
    return path.resolve(__dirname, "../data/auth.json");
  }

  static comparePassword(pass: string, saltedString: string) {
    return bcrypt.compare(pass, saltedString);
  }

  static saltPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  static async saveUsersToFile(users: User[]) {
    return fsPromises.writeFile(Auth.getFilePath(), JSON.stringify(users));
  }

  static sendResponse(res: Response, statusCode: number, message: string) {
    res.status(statusCode).json({
      success: statusCode >= 200 && statusCode < 300,
      message,
    });
  }

  static async getUserWithUsername(username: string) {
    const users = await Auth.getAllUsers();
    const foundUser = users.find((user) => user.username === username);
    return foundUser;
  }
}

export default Auth;
