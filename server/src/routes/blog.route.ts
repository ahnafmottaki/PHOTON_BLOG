import express, { NextFunction, Request, Response } from "express";
import { addBlog, getBlog } from "../controllers/blog.controller";
import { verifyToken } from "../middleware/verify-token";
import { validateSectionInputs } from "../middleware/validation-middleware";
const router = express.Router();

router.get("/:id", verifyToken, getBlog);
router.post("/", ...validateSectionInputs, verifyToken, addBlog);

export default router;
