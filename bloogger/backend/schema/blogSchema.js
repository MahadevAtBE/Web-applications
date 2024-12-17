import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200, // Limit to prevent overly long titles
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500, // Brief summary or snippet
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true, // URL of the blog image
    // default: null
  },
  htmlContent: {
    type: String,
    required: true, // Full blog content in HTML format
  },
  slug:{
    type:String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

// Exporting the model
const blogSchema = mongoose.models.blogSchema || mongoose.model('blog', schema);
export default blogSchema;