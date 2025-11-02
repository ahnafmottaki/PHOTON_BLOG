import { NextFunction, Request, Response } from "express";
import { RegisterRequest } from "../types/authtypes";
import UserModel from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/ApiResponse";
import { createJwtToken } from "../utils/jwt-related";
import { cookieSettingsForJWT } from "../utils/cookie-related";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password }: RegisterRequest = req.body;
    const user = new UserModel(username, email, password);
    // creating user in database
    await UserModel.create(user);
    // creating jwt token
    const accessToken = createJwtToken(user.toJwtPayload());
    // have to set cookie
    res.cookie("accessToken", accessToken, cookieSettingsForJWT);
    //sending response to client
    new ApiResponse(StatusCodes.CREATED, ReasonPhrases.CREATED).sendResponse(
      res
    );
  }
);
