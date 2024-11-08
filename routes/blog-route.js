import express from 'express';
import { createBlog, getAllBlogs, updateBlog,getById, deleteBlog, getBlogsByUserId } from '../controller/blogController';

const blogRouter=express.Router();

blogRouter.get("/", getAllBlogs)

// Add more routes for blog operations here (e.g., create, update, delete)
blogRouter.post("/create", createBlog)
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",getById)
blogRouter.delete("/delete/:id",deleteBlog)
blogRouter.get("/user/:id",getBlogsByUserId)

export default blogRouter;

