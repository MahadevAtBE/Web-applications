"use client"
import { useState } from 'react';
import { motion } from 'framer-motion'; // For animations

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback!');
    
    let responce = await fetch('http://localhost:5001/api/reviews', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    console.log(responce.status)
    if (responce.status == 201) {
      setFormData({ name: '', email: '', message: '', company: '' });
      }
    
  };

  

  return (
    <div className="min-h-screen my-10 flex flex-col items-center justify-center px-4">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center text-gray-800r"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Us
      </motion.h1>

      <motion.div 
        className="bg-whiter bg-slate-700 p-8 rounded-lg shadow-md w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Contact Links */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Get in Touch</h2>
          <ul className="space-y-3">
            <li>
              <a href="mailto:contact@binaryecho.com" className="text-blue-500 hover:underline">
                📧 Email: contact@binaryecho.com
              </a>
            </li>
            <li>
              <a href="https://twitter.com/binaryecho" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                🐦 Twitter: @binaryecho
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/binaryecho" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                💼 LinkedIn: Binary Echo
              </a>
            </li>
          </ul>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block  text-white font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border text-white border-gray-300 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white  font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border text-white  rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-white  font-medium mb-2">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-2 border text-white  rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white  font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border text-white  rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
