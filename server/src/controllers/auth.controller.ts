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
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const registerController = asyncHandler(async (req, res, next) => {
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
});

export const loginController = asyncHandler(async (req, res, next) => {
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
});

export const logoutController = asyncHandler((req, res, next) => {
  res.clearCookie("accessToken", cookieSettingsForJWT);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});

export const loggedController = asyncHandler(async (req, res, next) => {
  if (!req.cookies?.accessToken) {
    return next(
      new AppError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    );
  }
  try {
    const payload = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_SECRET as string
    ) as { _id: string };
    const user = (await userCollection.findOne({
      _id: new ObjectId(payload._id),
    })) as User;
    new ApiResponse(
      StatusCodes.OK,
      ReasonPhrases.OK,
      UserModel.toResponse(user)
    ).sendResponse(res);
  } catch (err) {
    return next(
      new AppError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    );
  }
});
