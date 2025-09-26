import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Auth, { type User } from "../class/Auth";
import { errorResponse } from "../utils/Error";
import { v4 as uuid } from "uuid";
import SessionManager from "../class/SessionManager";

interface LoginRequest {
  username: string;
  password: string;
}
interface RegisterRequest extends LoginRequest {
  age: number;
  address: string;
}

class AuthController {
  async loginUser(req: Request, res: Response) {
    const userCredentials: LoginRequest = req.body;
    try {
      const foundUser = await Auth.getUserWithUsername(
        userCredentials.username
      );
      if (!foundUser) {
        Auth.sendResponse(res, 404, "Invalid credentials");
        return;
      }
      const validPassword = await Auth.comparePassword(
        userCredentials.password,
        foundUser.password
      );
      if (!validPassword) {
        Auth.sendResponse(res, 401, "Invalid Credentials");
        return;
      }
      await SessionManager.createAndSetCookie(res, {
        username: foundUser.username,
        id: foundUser.id,
      });
      Auth.sendResponse(res, 200, "Logged In successful");
    } catch (error) {
      errorResponse(res, error);
    }
  }

  async registerUser(req: Request, res: Response) {
    const userCredentials: RegisterRequest = req.body;
    try {
      const foundUser = await Auth.getUserWithUsername(
        userCredentials.username
      );
      if (foundUser) {
        Auth.sendResponse(res, 404, "User already exists");
        return;
      }
      const encryptedPassword = await Auth.saltPassword(
        userCredentials.password
      );
      userCredentials.password = encryptedPassword;
      (userCredentials as User).id = uuid();
      const users = await Auth.getAllUsers();
      users.push(userCredentials as User);
      await Auth.saveUsersToFile(users);
      await SessionManager.createAndSetCookie(res, {
        username: userCredentials.username,
        id: (userCredentials as User).id,
      });
      Auth.sendResponse(res, 201, "User Registration successful");
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async logoutUser(req: Request, res: Response) {
    const tokenId = req.cookies?.token;
    try {
      if (tokenId) {
        await SessionManager.clearSessionAndCookie(res, tokenId);
      }
      res.status(200).json({
        success: true,
        message: "logout successful",
      });
    } catch (err) {
      errorResponse(res, err);
    }
  }
}

export default new AuthController();
