import { ObjectId } from "mongodb";
import BlogModel from "../models/blog.model";
import { SectionArrayType } from "../schema/section.schema";
import { withAuth } from "../utils/asyncHandler";
import { blogCollection } from "../database/db";

export const addBlog = withAuth(async (req, res, next) => {
  const blogSections: SectionArrayType = req.body.sections;
  console.log(req.user);
  const newBlog = new BlogModel(blogSections, new ObjectId(req.user._id));
  const dbResponse = await blogCollection.insertOne(
    newBlog.addIdsToSections().toJSON()
  );
  console.log(dbResponse);
  res.json(dbResponse);
});
