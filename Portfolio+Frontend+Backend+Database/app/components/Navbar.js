"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  return (
<nav className="bg-[#0f1b21] flex items-center justify-between px-7 py-6 text-white">
  <Link href="/">
  <div className="logo text-[#ffb703] font-bold text-lg">Website Name</div>
  </Link>
  <ul className="flex items-center gap-5">

    <Link href="/">
      <li
        className={`${
          pathname === "/" ? "text-[#8ecae6]" : "text-[#fb8500]"
        } hover:text-[#219ebc]`}
      >
        Home
      </li>
    </Link>

    <Link href="/signup">
      <li
        className={`${
          pathname === "/signup" ? "text-[#8ecae6]" : "text-[#fb8500]"
        } hover:text-[#219ebc]`}
      >
        SignUp
      </li>
    </Link>

    <Link href="/login">
      <li
        className={`${
          pathname === "/login" ? "text-[#8ecae6]" : "text-[#fb8500]"
        } hover:text-[#219ebc]`}
      >
        Login
      </li>
    </Link>

    <Link href="/find">
      <li
        className={`${
          pathname === "/find" ? "text-[#8ecae6]" : "text-[#fb8500]"
        } hover:text-[#219ebc]`}
      >
        Find
      </li>
    </Link>

    <Link href="/about">
      <li
        className={`${
          pathname === "/about" ? "text-[#8ecae6]" : "text-[#fb8500]"
        } hover:text-[#219ebc]`}
      >
        About
      </li>
    </Link>
    
  </ul>
</nav>

  )
}

export default Navbar
