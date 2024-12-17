import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-300 border-t-2 border-black dark:border-white dark:bg-black py-2">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Name */}
                    <div className="flex items-center space-x-3">
                        <div className='border-2 border-black rounded-full dark:border-white dark:rounded-full'>
                            <img
                                src="/binary-echo-logo.png" // Replace with your logo's path
                                alt="Binary Echo Logo"
                                className="h-12 w-12 animate-spin-slow invert dark:invert-0  "
                            />
                        </div>
                        <span className="text-xl font-bold">Binary Echo</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="mt-4 md:mt-0">
                        <ul className="flex space-x-6">
                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-white transition duration-300"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/blogs"
                                    className="hover:text-white transition duration-300"
                                >
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="hover:text-white transition duration-300"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition duration-300"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition duration-300"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition duration-300"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Footer Bottom Text */}
                <div className="text-center mt-2 text-sm">
                    <p>&copy; {new Date().getFullYear()} Binary Echo. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
