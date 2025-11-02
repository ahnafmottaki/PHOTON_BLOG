import { NextFunction, Request, RequestHandler, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";
import UserModel from "../models/user.model";

const withValidationErrors = (
  validators: ValidationChain[]
): RequestHandler[] => {
  return [
    ...validators,
    (req: Request, res: Response, next: NextFunction) => {
      console.log("form validation middleware");
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

const validateRegisterInputs = withValidationErrors([
  body("username")
    .trim()
    .notEmpty()
    .withMessage(getErrorMessage("required", "username"))
    .isLength({ min: 5, max: 20 })
    .withMessage(getErrorMessage("length", "username", 20, 5)),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(getErrorMessage("required", "email"))
    .isLength({ min: 9, max: 30 })
    .isEmail()
    .withMessage(getErrorMessage("length", "email", 30, 9))
    .custom(async (email, { req }) => {
      const { username }: { username: string } = req.body;
      await UserModel.isExist({ username, email });
    }),
  body("password").trim().notEmpty().isLength({ min: 6, max: 15 }),
]);

export { validateRegisterInputs };
