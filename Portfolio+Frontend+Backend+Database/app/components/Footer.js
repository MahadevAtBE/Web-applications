import React from 'react'
import Link from 'next/link'


const Footer = () => {
  return (<> 
 
  <footer className="bg-[#0f1b21] text-white py-6">
  <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
    {/* Logo and Name */}
    <div className="text-center md:text-left">
      <Link href={"/"}>
      <h1 className="text-2xl font-bold text-[#ffb703]">Website Name</h1>
      </Link>
      <p className="text-sm text-[#8ecae6] mt-1">
        © {new Date().getFullYear()} All Rights Reserved
      </p>
    </div>

    {/* Links Section */}
    <ul className="flex gap-6">
      <li>
        <a
          href="/privacy"
          className="text-[#fb8500] hover:text-[#ffb703] transition"
        >
          Privacy Policy
        </a>
      </li>
      <li>
        <a
          href="/terms"
          className="text-[#fb8500] hover:text-[#ffb703] transition"
        >
          Terms of Service
        </a>
      </li>
      <li>
        <a
          href="/contact"
          className="text-[#fb8500] hover:text-[#ffb703] transition"
        >
          Contact Us
        </a>
      </li>
    </ul>

    {/* Social Media Icons ???? social icons are not showing */}
    <div className="flex gap-7">
      {/* gmail  */}
      <a 
      target='new' 
      href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSDXXtWTjmqVfnkVSchhMxPlHSKCMQhFKFlkjPrpzFKRMlVdczSBLlpCQVjXbWdKjnzPMMph" className="text-[#8ecae6] hover:text-[#ffb703] transition">
      <img src="/gmail.svg" alt="gmail" width="35" height="35" />
      </a>

    {/* facebook  */}
      <a 
       target='new' 
       href="https://facebook.com" className="text-[#8ecae6] hover:text-[#ffb703] transition">
      <img src="/facebook.svg" alt="Facebook" width="35" height="35" />
      </a>

    {/* twitter  */}
      <a 
      target='new' 
        href="https://twitter.com"
        className="text-[#8ecae6] hover:text-[#ffb703] transition"
      >
        <img src="/twitter.svg" alt="twitter" width="35" height="35" />
      </a>

    {/* linkdin  */}
      <a
       target='new' 
        href="https://linkedin.com"
        className="text-[#8ecae6] hover:text-[#ffb703] transition"
      >
        <img src="/linkedin.svg" alt="linkedin" width="35" height="35" />
      </a>

    {/* github  */}
      <a
       target='new' 
        href="https://github.com/MahadevAtBE/Web-projects"
        className="text-[#8ecae6] hover:text-[#ffb703] transition"
      >
        <img src="/github.svg" alt="github" width="35" height="35" />
      </a>

    </div>
  </div>
</footer>
</>

  )
}
export default Footer
