const { Router } = require("express");
const { createBlogs, updateBlog, getBlog, getBlogById, deleteBlog } = require("../controllers/blog");
const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");

const blogRouter = Router();

blogRouter.post("/", [
    check("title", "title is required").notEmpty(),
    check("content", "content is required").notEmpty()
], authMiddleware, createBlogs);

blogRouter.get("/", authMiddleware, getBlog);
blogRouter.get("/:id", authMiddleware, getBlogById);

blogRouter.put("/:id", authMiddleware, updateBlog);
blogRouter.delete("/:id", authMiddleware, deleteBlog);

module.exports = blogRouter;