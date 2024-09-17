import mongoose from 'mongoose';

// Define the Blog schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    mini_content: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    short_content: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the Blog model
const BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel;
