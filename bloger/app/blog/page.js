"use client"
import React from 'react';
import { buttonVariants } from "@/components/ui/button"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import generateSlug from '@/components/generateSlug';
// import fs from "fs"
import matter from 'gray-matter' // used to show md files properly
// import generateSlug from '@/components/generateSlug';

// const dirContent=fs.readdirSync("content","utf-8")// getting blogs from content folder
// const blogs=dirContent.map(file=>{
//   const fileContent = fs.readFileSync(`content/${file}`,"utf-8")
//   const {data} = matter(fileContent)  // getting data object from blog, which is set by matter header
//   return data 
// return  matter(fileContent)
// }
// )

// making a get request to backend to get data
const Blog = () => {
  const [blogs, setblogs] = useState([])

  // fetching blogs to display
  const getblogs = async () => {
    const response = await fetch('http://localhost:5001/blog/getBlog');
    const data = await response.json()
    setblogs(data.recentBlogs)
  }

  useEffect(() => {
    getblogs()
  }, [])


  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Blog Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="shadow-md rounded-lg overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <p className="text-sm text-gray-500 mb-2">By {blog.author} on {blog.date}</p>
                <div className='flex justify-end'>

                  <Link href={`/blogpost/${generateSlug(blog.title)}`} className={buttonVariants({ variant: "outline" })}>Click here</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
