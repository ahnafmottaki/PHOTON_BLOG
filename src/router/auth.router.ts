import express from "express";
import authController from "../controller/auth.controller";
const router = express.Router();

// /api/auth/register
router.post("/register", authController.registerUser);

// api/auth/login
router.post("/login", authController.loginUser);

//api/auth/logout
router.post("/logout", authController.logoutUser);

export default router;
