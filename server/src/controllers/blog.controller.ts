import { ObjectId } from "mongodb";
import BlogModel from "../models/blog.model";
import { SectionArrayType } from "../schema/section.schema";
import { withAuth } from "../utils/asyncHandler";
import { blogCollection } from "../database/db";
import ApiResponse from "../utils/ApiResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";

export const addBlog = withAuth(async (req, res, next) => {
  const blogSections: SectionArrayType = req.body.sections;
  const newBlog = new BlogModel(blogSections, new ObjectId(req.user._id));
  const dbResponse = await blogCollection.insertOne(
    newBlog.addIdsToSections().toJSON()
  );
  new ApiResponse(StatusCodes.CREATED, ReasonPhrases.CREATED, {
    id: dbResponse.insertedId,
  }).sendResponse(res);
});

export const getBlog = withAuth(async (req, res, next) => {
  const id = req.params.blogId;
  if (!id) {
    return next(
      new AppError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    );
  }
  const blog = await blogCollection.findOne({ _id: new ObjectId(id) });
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, blog).sendResponse(res);
});
