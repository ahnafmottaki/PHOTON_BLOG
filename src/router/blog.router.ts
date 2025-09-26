import express from "express";
import blogController from "../controller/blog.controller";
import sessionMiddleware from "../middleware/session-middleware";

const router = express.Router();
// api/blog
router.get("/", blogController.getAllBlogs);

// api/blog
router.post("/", sessionMiddleware, blogController.createBlog);

//api/blog/:id
router.get("/:id", sessionMiddleware, blogController.getSingleBlog);

// api/blog/:id
router.patch("/:id", sessionMiddleware, blogController.updateBlog);

//api/blog/:id
router.delete("/:id", sessionMiddleware, blogController.deleteBlog);

export default router;
