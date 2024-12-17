"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';

import LoadingBar from 'react-top-loading-bar';  // for loading effext on top of navbar
import { usePathname } from 'next/navigation';  // to activate the top loadingbar at path change

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from './theme-btn';



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    const [progress, setProgress] = useState(0)
    const pathName = usePathname()
    useEffect(() => {
        setProgress(30)
        setTimeout(() => {
            setProgress(70)

        }, 100);
        setTimeout(() => {
            setProgress(100)

        }, 800);
        setTimeout(() => {
            setProgress(0)

        }, 900);
    }, [pathName])



    return (
        <nav className="p-4 flex bg-background/50 sticky top-0  border-b backdrop-blur z-50">

            <LoadingBar  // loading bar
                // color='#f11946'
                color='#eab308'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <div className='container mx-auto flex justify-between items-center'>
                <div className="text-xl font-bold">
                    <Link href="/">
                        <div className='flex items-center gap-3'>
                            <div className='border-2 border-black rounded-full dark:border-white dark:rounded-full'>
                                <img className='h-10 p-1 invert dark:invert-0 ' src="binary-echo-logo.png" alt="" />
                            </div>
                            <h1>Binary Echo</h1>
                        </div>
                    </Link>
                </div>
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>
                                    <div className="text-xl font-bold my-4">
                                        <Link href="/">Binary Echo</Link>
                                    </div>
                                </SheetTitle>
                                <SheetDescription>
                                    <span className="flex flex-col gap-6 items-center">
                                        <Link href="/" className="hover:text-gray-400">
                                            Home
                                        </Link>
                                        <Link href="/about" className="hover:text-gray-400">
                                            About
                                        </Link>
                                        <Link href="/blog" className="hover:text-gray-400">
                                            Blog
                                        </Link>
                                        <Link href="/contact" className="hover:text-gray-400">
                                            Contact
                                        </Link>
                                        <Link href="/notepad" className="hover:text-gray-400">
                                            Notepad
                                        </Link>
                                        <Button className="mx-1" variant="outline">Login</Button>
                                        <Button className="mx-1" variant="outline">Signup</Button>
                                        <ModeToggle />
                                    </span>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </div>
                <ul className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block items-center`}>
                    <li>
                        <Link href="/" className="hover:text-gray-400">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-gray-400">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:text-gray-400">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-gray-400">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="/notepad" className="hover:text-gray-400">
                            Notepad
                        </Link>
                    </li>
                    {/* <div className='flex items-center'> */}
                    <span className='flex items-center'>

                        <Button className="mx-1" variant="outline">Login</Button>
                        <Button className="mx-1" variant="outline">Signup</Button>

                        <ModeToggle />
                    </span>
                    {/* </div> */}
                </ul>

            </div>

        </nav>
    );
};

export default Navbar;
