const { Router } = require("express");
const { createBlogs, updateBlog } = require("../controllers/blog");
const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");

const blogRouter = Router();

blogRouter.post("/", [
    check("title", "title is required").notEmpty(),
    check("content", "content is required").notEmpty()
], authMiddleware, createBlogs);

blogRouter.put("/:id", authMiddleware, updateBlog);


module.exports = blogRouter;