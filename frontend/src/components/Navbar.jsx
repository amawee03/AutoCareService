import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white font-bold shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">
          AutoCare
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-red-500 transition duration-200">
            Home
          </Link>
          <Link
            to="/services"
            className="hover:text-red-500 transition duration-200"
          >
            Services
          </Link>
          <a href="/about" className="hover:text-red-500 transition duration-200">
            About
          </a>
          <a href="/contact" className="hover:text-red-500 transition duration-200">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200">
            Book Now
          </button>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar