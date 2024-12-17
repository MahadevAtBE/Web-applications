"use client"
import { useState,useEffect } from "react";

// npm install unified  // to modefie the md file content as a html to showcase
import { unified } from 'unified'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'

import rehypePrettyCode from "rehype-pretty-code"; // to make the cod look good
import { transformerCopyButton } from '@rehype-pretty/transformers' // copy btn on code


export default function Page({ params }) {

   let [data, setdata] = useState(null)
   const [htmlContent, setHtmlContent] = useState(null);


   
  const getblogs = async () => {
    const slug = params?.slug;
    if (!slug) {
      console.error("Slug is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/blog/findBlog", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: slug }),
      });

      const result = await response.json();
      setHtmlContent(result?.data?.htmlContent);


      setdata(result)

      if (data.data?.htmlContent) {
        const processor = unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypeDocument, { title: result.data.title })
          .use(rehypeFormat)
          .use(rehypeStringify)
          .use(rehypePrettyCode, {
            theme: "github-dark",
            transformers: [
              transformerCopyButton({
                visibility: "always",
                feedbackDuration: 3000,
              }),
            ],
          });

        const processedHtml = await processor.process(data.data.htmlContent);
        setHtmlContent(processedHtml.toString());
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };
    
    useEffect(() => {
        getblogs()
    }, [])
    useEffect(() => {
        // getblogs()
    }, [data])


    if (!data) {
        return <p>Loading...</p>; // Render loading state until data is available
      }

    return (
        <>
        <div className="p-6 max-w-3xl mx-auto rounded-xl shadow-md space-y-4">
            <h1 className="text-5xl font-bold">{data?.data?.title || "No Title Found"}</h1>
            <blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-500">
                {data?.data?.description || "No Title Found"}
            </blockquote>
            <div className="text-sm italic text-gray-500">
                <span>By- {data?.data?.author || "No Title Found"}</span> | <span>{data?.data?.date || "No Title Found"}</span>
            </div>
            <div
                className="prose dark:prose-invert" // dark:prose-invert to remove the grey color in dark mode
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
        </div>
        </>
    );
}