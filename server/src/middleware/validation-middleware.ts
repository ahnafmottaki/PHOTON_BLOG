import { NextFunction, Request, RequestHandler, Response } from "express";
import * as z from "zod";
import {
  body,
  CustomValidationChain,
  CustomValidator,
  ValidationChain,
  validationResult,
} from "express-validator";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";
import UserModel from "../models/user.model";
import { userCollection } from "../database/db";
import { SectionsSchema } from "../schema/section.schema";
import asyncHandler from "../utils/asyncHandler";

const withValidationErrors = (
  validators: ValidationChain[]
): RequestHandler[] => {
  return [
    ...validators,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const message = errors.array().map((error) => error.msg)[0];
        return next(new AppError(StatusCodes.BAD_REQUEST, message));
      }
      next();
    },
  ];
};
const getErrorMessage = (
  type: "required" | "length",
  fieldName: string,
  maxLength?: number,
  minLength?: number
) => {
  if (type === "required") {
    return `${fieldName} is required`;
  }
  return `${fieldName} needs to be between ${maxLength} to ${minLength} characters`;
};

const emailAndPassValidators = (fn: CustomValidator): ValidationChain[] => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage(getErrorMessage("required", "email"))
      .isLength({ min: 14, max: 35 })
      .isEmail()
      .withMessage(getErrorMessage("length", "email", 35, 14))
      .custom(fn),
    body("password").trim().notEmpty().isLength({ min: 6, max: 15 }),
  ];
};

const validateRegisterInputs = withValidationErrors([
  body("username")
    .trim()
    .notEmpty()
    .withMessage(getErrorMessage("required", "username"))
    .isLength({ min: 5, max: 20 })
    .withMessage(getErrorMessage("length", "username", 20, 5)),
  ...emailAndPassValidators(async (email, { req }) => {
    const { username }: { username: string } = req.body;
    const isUserExists = await UserModel.isExist({ username, email });
    if (isUserExists) {
      return Promise.reject("User already exits");
    }
  }),
]);

const validateLoginInputs = withValidationErrors([
  ...emailAndPassValidators(async (email, { req: Request }) => {
    const isUserExists = await UserModel.isExist({ email });
    if (!isUserExists) {
      return Promise.reject("User doesn't exist with this email address");
    }
  }),
]);

const validateInputs = (
  Schema: z._ZodType,
  ...handlers: RequestHandler[]
): RequestHandler[] => {
  return [
    ...handlers,
    asyncHandler((req: Request, res: Response, next: NextFunction) => {
      const result = Schema.safeParse(req.body);
      if (!result.success) {
        return next(
          new AppError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        );
      }
      console.log(result.data);
      next();
    }),
  ];
};

const validateSectionInputs = validateInputs(
  z.object({ sections: SectionsSchema })
);

export { validateRegisterInputs, validateLoginInputs, validateSectionInputs };
