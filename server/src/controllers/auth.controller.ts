import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegisterRequest } from "../types/authtypes";
import UserModel, { User } from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/ApiResponse";
import { createJwtToken } from "../utils/jwt-related";
import { cookieSettingsForJWT } from "../utils/cookie-related";
import { userCollection } from "../database/db";
import { matchedData } from "express-validator";
import AppError from "../utils/AppError";

export const registerController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password }: RegisterRequest = req.body;
    const user = new UserModel(username, email, password);
    // creating user in database
    await UserModel.create(user);
    // creating jwt token
    const accessToken = createJwtToken(UserModel.toJwtPayload(user));
    // have to set cookie
    res.cookie("accessToken", accessToken, cookieSettingsForJWT);
    //sending response to client
    new ApiResponse(
      StatusCodes.CREATED,
      ReasonPhrases.CREATED,
      UserModel.toResponse(user)
    ).sendResponse(res);
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginRequest = matchedData(req);
    const data = (await userCollection.findOne({ email })) as User;
    const isPassSame = await UserModel.comparePassword(password, data.password);
    if (!isPassSame)
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
      );
    const accessToken = createJwtToken(UserModel.toJwtPayload(data));
    res.cookie("accessToken", accessToken, cookieSettingsForJWT);
    new ApiResponse(
      StatusCodes.OK,
      ReasonPhrases.OK,
      UserModel.toResponse(data)
    ).sendResponse(res);
  }
);

export const logoutController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("accessToken", cookieSettingsForJWT);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
};
