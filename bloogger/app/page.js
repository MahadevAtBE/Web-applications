"use client"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

import { useState } from 'react';
import Link from 'next/link';

import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import generateSlug from "@/components/generateSlug";
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'



export default function Home() {

  const router = useRouter()  // to push routs

  // hook form 
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm()


  const [blogs, setblogs] = useState([])
  const [feedbacks, setfeedbacks] = useState([])

  // to fetch blogs
  const getblogs = async () => {
    const response = await fetch('http://localhost:5001/blog/getBlog');
    const data = await response.json()
    setblogs(data.recentBlogs)
  }

  // to fetch feedbacks
  const getfeedback = async () => {
    const response = await fetch('http://localhost:5001/api/reviews');
    const data = await response.json()
    setfeedbacks(data)
  }

  useEffect(() => {
    getblogs()
    getfeedback()
  }, [])


  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Coding', 'Web Development', 'Software Engineering', 'Data Science', 'Machine Learning', 'Programming'],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);


  const onSubmit = async (data) => {
    console.log(data)

    let response = await fetch('http://localhost:5001/blog/searchBlog', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    console.log(response.status)
    const blog = await response.json()
    console.log(blog.data.slug)
    router.push(`/blogpost/${blog.data.slug}`)
  }

  return (
    <main className="max-w-[80%] mx-auto">
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">Blogging site</span> that givs you <br className="hidden lg:block" /> updats on <span className="font-semibold underline decoration-primary"><span ref={el} /></span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Hi! This is Sekhar <br className="hidden lg:block" />The creator of this blogging page<br className="hidden lg:block" /> Where you can find blogs related Programming.
          </p>
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action="https://www.creative-tim.com/twcomponents/search" className="flex flex-wrap justify-between md:flex-row">
              <input
                type="search"
                name="title"
                placeholder="Search Blog"
                required
                className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"

                {...register('title', { required: { value: true, message: "value Required!" } })}
              />
              <button
                type="submit"
                className="bg-slate-800 flex items-center justify-center w-full p-2 m-1 text-white transition-colors duration-300 transform rounded-lg lg:w-12 lg:h-12 lg:p-0 bg-primary hover:bg-primary/70 focus:outline-none focus:bg-primary/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg" alt="tailwind css components" className="w-full h-full max-w-md mx-auto" />
        </div>
      </section>

      {/* Top Blogs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Top Blogs</h2>
          <div className="h-1 dark:bg-white bg-black w-[60%] mx-auto rounded-full mb-8"></div> {/*line */}
          <div className="flex overflow-x-auto -mx-4">
            {blogs.map((blog, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex-shrink-0">
                <div className="rounded-lg shadow-lg p-6 border transition-transform duration-500 hover:scale-105">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
                  <h3 className="text-xl font-semibold mb-4">{blog.title}</h3>
                  <p className="mb-4">{blog.description}</p>
                  <div className='flex justify-end'>
                    <Link href={`/blogpost/${generateSlug(blog.title)}`} className={buttonVariants({ variant: "outline" })}>Click here</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Pricing Plans */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Pricing Plans</h2>
          <div className="h-1 dark:bg-white bg-black w-[60%] mx-auto  rounded-full mb-8"></div> {/*line */}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:bg-slate-800k">
                <div className="p-6 border flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Basic Plan</h3>
                    <p className="text-gray-600 mb-4">A basic plan for individuals.</p>
                    <p className="text-2xl font-bold mb-4">$10/month</p>
                    <ul className="mb-4">
                      <li className="text-gray-600">Feature 1</li>
                      <li className="text-gray-600">Feature 2</li>
                      <li className="text-gray-600">Feature 3</li>
                    </ul>
                  </div>
                  <Button className="self-end mt-4" variant="outline">Read More</Button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:bg-slate-800k">
                <div className="p-6 border flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Standard Plan</h3>
                    <p className="text-gray-600 mb-4">A standard plan for small teams.</p>
                    <p className="text-2xl font-bold mb-4">$20/month</p>
                    <ul className="mb-4">
                      <li className="text-gray-600">Feature 1</li>
                      <li className="text-gray-600">Feature 2</li>
                      <li className="text-gray-600">Feature 3</li>
                    </ul>
                  </div>
                  <Button className="self-end mt-4" variant="outline">Read More</Button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:bg-slate-800k">
                <div className="p-6 border flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
                    <p className="text-gray-600 mb-4">A premium plan for large organizations.</p>
                    <p className="text-2xl font-bold mb-4">$30/month</p>
                    <ul className="mb-4">
                      <li className="text-gray-600">Feature 1</li>
                      <li className="text-gray-600">Feature 2</li>
                      <li className="text-gray-600">Feature 3</li>
                    </ul>
                  </div>
                  <Button className="self-end mt-4" variant="outline">Read More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* What Our Clients Say */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">What Our Clients Say</h2>
          <div className="h-1 dark:bg-white bg-black w-[60%] mx-auto rounded-full mb-8"></div>
          <div className="flex flex-wrap -mx-4">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="rounded-lg shadow-lg p-6 border">
                  <p className="text-gray-600 mb-4">"{feedback.message}"</p>
                  <div className="flex items-center">
                    <img
                      src={feedback.image ? feedback.image : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt={`Client ${feedback.name}`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{feedback.name}</h4>
                      <p className="text-gray-500">{feedback.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </main>
  );
}




