import { type Request, type Response } from "express";
import { v4 as uuid } from "uuid";

// file imports
import Blog from "../class/Blog";
import { CreateBlogRequest, updateBlogRequest } from "../dtos";
import { errorResponse } from "../utils/Error";

class BlogController {
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await Blog.getAllBlogs();
      Blog.sendResponse(res, 200, { blogs });
    } catch (error) {
      errorResponse(res, error);
    }
  }

  async createBlog(req: Request, res: Response) {
    const blogData: CreateBlogRequest = req.body;
    const newBlog = new Blog({
      ...blogData,
      id: uuid(),
      likes: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    try {
      await newBlog.saveToFile();
      Blog.sendResponse(res, 201, { blog: newBlog.mapToResponse() });
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async getSingleBlog(req: Request, res: Response): Promise<void> {
    const id = req.params?.id;
    if (!id) {
      res.status(404).json({
        success: false,
        message: "Invalid id parameter",
      });
      return;
    }
    try {
      const foundBlog = await Blog.getBlogById(id);
      if (!foundBlog) {
        Blog.sendResponse(
          res,
          404,
          {},
          `Couldn't Find any Blog with that id ${id}`
        );
        return;
      }
      Blog.sendResponse(res, 200, { blog: foundBlog });
    } catch (error) {
      errorResponse(res, error);
    }
  }

  async updateBlog(req: Request, res: Response): Promise<void> {
    const id = req.params?.id;
    const updatedData: updateBlogRequest = req.body;
    if (!id) {
      res.status(404).json({
        success: false,
        message: "Invalid Id parameter",
      });
      return;
    }
    try {
      const blogs = await Blog.getAllBlogs();
      const foundIndex = blogs.findIndex((blog) => blog.id === id);
      if (foundIndex === -1) {
        Blog.sendResponse(res, 404, {}, "Blog Not Found");
        return;
      }
      type BlogType = (typeof blogs)[number];
      blogs[foundIndex] = {
        ...blogs[foundIndex],
        ...updatedData,
        updatedAt: Date.now(),
      } as BlogType;
      await Blog.writeBlogsToFile(blogs);
      Blog.sendResponse(res, 200, { blog: blogs[foundIndex] });
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    const id = req.params?.id;
    if (!id) {
      Blog.sendResponse(res, 404, {}, "Invalid id parameter");
      return;
    }
    try {
      const blogs = await Blog.getAllBlogs();
      const isBlogAvailable = blogs.some((blog) => blog.id === id);
      if (!isBlogAvailable) {
        Blog.sendResponse(res, 404, {}, "Invalid id parameter");
        return;
      }
      const newBlogs = blogs.filter((blog) => blog.id !== id);
      await Blog.writeBlogsToFile(newBlogs);
      Blog.sendResponse(res, 200, {}, "Blog deleted successfully");
    } catch (err) {
      errorResponse(res, err);
    }
  }
}

export default new BlogController();
