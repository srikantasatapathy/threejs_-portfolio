'use client';

import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
// Import icons for theme toggle later if needed
// import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change background when scrolled 50px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['hero', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Name */}
        <ScrollLink
          to="hero"
          smooth={true}
          duration={500}
          spy={true}
          offset={-70} // Adjust offset based on navbar height
          className="text-xl font-bold cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
        >
          Srikant S.
        </ScrollLink>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth={true}
              duration={500}
              spy={true} // Highlights the link when the section is in view
              activeClass="text-blue-600 dark:text-blue-400 font-semibold" // Style for active link
              offset={-70} // Adjust offset
              className="capitalize cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {item === 'hero' ? 'Home' : item}
            </ScrollLink>
          ))}
        </div>

        {/* Theme Toggle Button (Placeholder) */}
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          {/* Add Sun/Moon Icon here later */}
          Theme
        </button>

        {/* Mobile Menu Button (Optional) */}
        {/* Add logic for mobile menu toggle */}
      </div>
    </nav>
  );
};

export default Navbar;