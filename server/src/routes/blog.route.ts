import express, { NextFunction, Request, Response } from "express";
import { addBlog } from "../controllers/blog.controller";
import { verifyToken } from "../middleware/verify-token";
import { validateSectionInputs } from "../middleware/validation-middleware";
const router = express.Router();

router.post("/", verifyToken, ...validateSectionInputs, addBlog);

export default router;
