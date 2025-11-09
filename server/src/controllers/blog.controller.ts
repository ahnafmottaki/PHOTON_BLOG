import { ObjectId } from "mongodb";
import BlogModel from "../models/blog.model";
import { SectionArrayType } from "../schema/section.schema";
import { withAuth } from "../utils/asyncHandler";
import { blogCollection, userCollection } from "../database/db";
import ApiResponse from "../utils/ApiResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";

export const addBlog = withAuth(async (req, res, next) => {
  const blogSections: SectionArrayType = req.body.sections;
  const newBlog = new BlogModel(
    new ObjectId(),
    blogSections,
    new ObjectId(req.user._id)
  );
  const insertResponse = await blogCollection.insertOne(
    newBlog.addIdsToSections().toJSON()
  );
  if (!insertResponse.insertedId) {
    console.log("this block is running");
    return next(
      new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR
      )
    );
  }
  const updateResponse = await userCollection.updateOne(
    { _id: new ObjectId(req.user._id) },
    { $push: { blogs: insertResponse.insertedId } }
  );
  console.log(updateResponse);
  if (updateResponse.modifiedCount === 0) {
    return next(
      new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR
      )
    );
  }
  new ApiResponse(StatusCodes.CREATED, ReasonPhrases.CREATED, {
    id: insertResponse.insertedId,
  }).sendResponse(res);
});

export const getBlog = withAuth(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(
      new AppError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    );
  }
  const blog = await blogCollection
    .aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" },
      {
        $project: {
          author: 0,
          "authorInfo._id": 0,
          "authorInfo.password": 0,
          "authorInfo.role": 0,
          "authorInfo.blogs": 0,
        },
      },
    ])
    .toArray();
  if (blog.length === 0) {
    return next(new AppError(StatusCodes.BAD_REQUEST, "No blog with this id"));
  }
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, blog[0]).sendResponse(res);
});
