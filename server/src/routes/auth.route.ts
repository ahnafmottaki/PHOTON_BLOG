import express, { Request, Response } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";
import {
  validateLoginInputs,
  validateRegisterInputs,
} from "../middleware/validation-middleware";
const router = express.Router();

router.post("/login", ...validateLoginInputs, loginController);

router.post("/register", ...validateRegisterInputs, registerController);

export default router;
