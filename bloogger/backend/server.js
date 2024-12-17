"use server"

import express from 'express'    // to create a backend server
import mongoose from 'mongoose'  // for database
import cors from "cors"  // frontend and backend running on deferent port to connect them
import bodyParser from 'body-parser'  // to parse the data to json from string
import review from './routes/review.js'
import blog from './routes/blog.js'


await mongoose.connect("mongodb://localhost:27017/blog")    // local db connection


function generateSlug(input) {
  return input
  .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-'); // Replace multiple dashes with a single dash
  }
  
  
  const app = express()
  const port = 5001

  
  app.use(cors())
  app.use(bodyParser.json())
  app.use('/api/reviews', review)
  app.use('/blog', blog)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


