import express, { Request, Response } from "express";
import { register } from "../controllers/auth.controller";
import { validateRegisterInputs } from "../middleware/validation-middleware";
const router = express.Router();

router.post("/login", (req: Request, res: Response) => {});

router.post("/register", ...validateRegisterInputs, register);

export default router;
