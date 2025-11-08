import "../config/cloudinary.config";
import express from "express";
import asyncHandler from "../utils/asyncHandler";
import { generateCloudinarySignature } from "../modules/signed-up-delete";
import ApiResponse from "../utils/ApiResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { verifyToken } from "../middleware/verify-token";
const router = express.Router();

const cloud_name = process.env.CLOUD_NAME!;
const api_key = process.env.CLOUDINARY_API_KEY!;

router.post(
  "/cloudinarySignature",
  verifyToken,
  asyncHandler((req, res, next) => {
    const { action, params } = req.body;
    const timestamp = Math.round(Date.now() / 1000);
    let paramsToSign: {
      timestamp: number;
      folder?: string;
      public_id?: string;
    } = { timestamp };
    if (action === "upload" && params.folder) {
      paramsToSign.folder = params.folder;
    }

    if (action === "destroy" && params.public_id) {
      paramsToSign.public_id = params.public_id;
    }
    const signature = generateCloudinarySignature(paramsToSign);
    const response = {
      signature,
      timestamp,
      cloud_name,
      api_key,
    };
    new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, response).sendResponse(
      res
    );
  })
);

export default router;
