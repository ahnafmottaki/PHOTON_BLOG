import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import writeToFile from "../utils/file-system";
import { Response } from "express";

interface BlogType {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  createdAt: number;
  updatedAt: number;
}
class Blog {
  private _id: string;
  private _title: string;
  private _description: string;
  private _likes;
  private _tags: string[];
  private _createdAt: number;
  private _updatedAt: number;
  constructor({
    id,
    title,
    description,
    tags,
    likes,
    createdAt,
    updatedAt,
  }: BlogType) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._tags = tags;
    this._likes = likes;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  mapToResponse() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      tags: this._tags,
      likes: this._likes,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  async saveToFile() {
    const blogs = await Blog.getAllBlogs();
    blogs.push(this.mapToResponse());
    return Blog.writeBlogsToFile(blogs);
  }

  static getFilePath() {
    return path.resolve(__dirname, "../data", "blogs.json");
  }

  static async getAllBlogs() {
    const blogsBuffer = await fsPromises.readFile(Blog.getFilePath());
    const blogs: BlogType[] = JSON.parse(blogsBuffer.toString());
    return blogs;
  }

  static writeBlogsToFile(blogs: BlogType[]) {
    return fsPromises.writeFile(Blog.getFilePath(), JSON.stringify(blogs));
  }

  static sendResponse(
    res: Response,
    statusCode: number,
    data: any,
    message: string = ""
  ) {
    res.status(statusCode).json({
      success: statusCode >= 200 && statusCode < 300,
      data,
      message,
    });
  }

  static async getBlogById(id: string) {
    const blogs = await Blog.getAllBlogs();
    return blogs.find((blog) => blog.id === id);
  }
}

export default Blog;
