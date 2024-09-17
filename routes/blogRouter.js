import express from 'express';
import { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controller/blogModel.js'; // Adjust import path as needed

const blogrouter = express.Router()

blogrouter.post('/addblog', addBlog);              // Create a new blog post
blogrouter.get('/getblog', getAllBlogs);           // Get all blog posts
blogrouter.get('/oneblog/:id', getBlogById);       // Get a blog post by ID
blogrouter.put('/updateblog/:id', updateBlog);        // Update a blog post by ID
blogrouter.delete('/deleteblog/:id', deleteBlog);     // Delete a blog post by ID

export default blogrouter;
