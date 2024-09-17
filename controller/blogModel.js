import BlogModel from '../model/BlogModel.js';

// Create a new blog post
export const addBlog = async (req, res) => {
    try {
        const blog = new BlogModel(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all blog posts
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a blog post by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a blog post by ID
export const updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a blog post by ID
export const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
