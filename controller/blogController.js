import mongoose from "mongoose";
import Blog from "../models/BlogModel";
import User from "../models/userModel";


// Get all blogs
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }

    if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json({blogs})    
};


// Create a new blog
export const createBlog = async (req, res, next) => {
    const { title, content, image, author } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(author);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found with this ID" });
    }

    try {
        const newBlog = new Blog({ title, content, image, author });
        await newBlog.save();

        existingUser.blogs.push(newBlog);
        await existingUser.save();

        return res.status(201).json({ newBlog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};



// Update an existing blog
// Update an existing blog
export const updateBlog = async (req, res, next) => {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
        // Update the blog and return the new document
        const blog = await Blog.findByIdAndUpdate(
            id,
            { title, content }, // Updated fields
            { new: true } // Returns the updated document
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getById=async (req, res, next) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete a blog
export const deleteBlog = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the blog and populate the author field
        const blog = await Blog.findById(id).populate("author");
        
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Remove the blog reference from the author's blogs array
        await blog.author.blogs.pull(blog._id);
        await blog.author.save();  // Save changes to the author

        // Delete the blog itself
        await Blog.findByIdAndDelete(id);

        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
        
    }
};



// Get blogs by user ID
export const getBlogsByUserId = async (req, res, next) => {
    const { id } = req.params;
    console.log("User ID:", id); // Debug: Verify userId

    try {
        const author = await User.findById(id); // Remove populate temporarily

        if (!author) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ blogs: author.blogs });
    } catch (error) {
        console.error("Error in getBlogsByUserId:", error);
        return res.status(500).json({ message: "Server error" });
    }
};      

