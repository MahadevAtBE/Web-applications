import express from 'express';
import blogSchema from "../schema/blogSchema.js" 
import generateSlug from '../../components/generateSlug.js';

const blog = express.Router();

// function generateSlug(input) {
//     return input
//     .toLowerCase() // Convert to lowercase
//       .trim() // Remove leading and trailing spaces
//       .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
//       .replace(/\s+/g, '-') // Replace spaces with dashes
//       .replace(/-+/g, '-'); // Replace multiple dashes with a single dash
//     }
    

blog.get('/getBlog',async (req, res) => {
    try {
      // Fetch the last 7 entries by sorting in descending order of date
      const recentBlogs = await blogSchema.find()
        .sort({ date: -1 }) // Sort by date in descending order
        .limit(7);          // Limit to the last 7 entries
  
      res.status(200).json({
        recentBlogs
      });
    } catch (error) {
      console.error('Error fetching recent blog posts:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  })
  
  
  blog.post('/searchBlog', async (req, res) => {
    const query = req.body;  // 
    console.log(query)
    if (!query) {
      return res.status(400).json({ message: 'Cant find the blog.' });
    }
    let data=await blogSchema.findOne(query)
    // console.log(data)
    if (data==null) {
      res.status(401).json({Massege:"blog not exist in database!"})
    }
    else{
      res.status(201).json({
        data
      })
    }
  })
  
  blog.post('/findBlog', async (req, res) => {
    const slug = req.body;  // 
    if (!slug) {
      return res.status(400).json({ message: 'Cant find the blog.' });
    }
    let data=await blogSchema.findOne(slug)
    // console.log(data)
    if (data==null) {
      res.status(401).json({Massege:"blog not exist in database!"})
    }
    else{
      res.status(201).json({
        data
      })
    }
  })
  
  
  
  blog.post('/uploadBlog', async (req, res) => {
    const { title, description, author,image, htmlContent } = req.body;
  
    // Validate input data
    if (!title || !description || !author || !htmlContent) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const blog = new blogSchema({  // file name of db (user)
      title,
      description,
      author,
      image,
      htmlContent,
      slug:generateSlug(title)
      // slug:generateSlug(title)
    })
    blog.save()
    // res.status(200).json({ Massege: "data saved" })
    // Send success response
    res.status(201).json({
      message: 'Blog post created successfully!',
    })
  })

export default blog;