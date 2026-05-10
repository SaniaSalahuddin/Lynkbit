"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ For hamburger icon (lucide-react)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 flex items-center justify-between bg-white rounded-full shadow-md px-6 py-4 w-[90vw] max-w-6xl z-50">
      
      {/* Logo + Brand */}
      <Link href="/" className="flex items-center gap-2">
        
        <span className="font-extrabold text-2xl text-gray-800">LinkHub</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Products</p>
        <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Template</p>
        <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Marketplace</p>
        <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Learn</p>
        <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Pricing</p>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-3">
        <button className="px-6 py-2 bg-gray-100 font-semibold rounded-md text-lg hover:bg-gray-200 transition">
          Login
        </button>
        <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-lg hover:bg-gray-800 transition">
          Sign up free
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[85vw] bg-white shadow-md rounded-2xl flex flex-col items-center gap-4 py-6 md:hidden">
          <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Products</p>
          <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Template</p>
          <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Marketplace</p>
          <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Learn</p>
          <p className="text-gray-700 font-semibold hover:text-black cursor-pointer">Pricing</p>
          
          {/* Mobile Buttons */}
          <button className="px-6 py-2 bg-gray-100 font-semibold rounded-md text-lg hover:bg-gray-200 transition w-4/5">
            Login
          </button>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-lg hover:bg-gray-800 transition w-4/5">
            Sign up free
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
