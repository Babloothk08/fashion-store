import React from 'react'
import { RiVisaLine } from "react-icons/ri";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";

function Footer() {
  return (
    <div className="bg-[#0f172a] text-gray-300">
  {/* Top section */}
  <div className="max-w-7xl mx-auto px-6 py-12 
    flex flex-wrap justify-between gap-10">

    {/* Brand */}
    <div className="flex flex-col gap-3 max-sm:text-center">
      <h1 className="text-3xl font-extrabold text-white tracking-wide">
        Fashion<span className="text-orange-400">Store</span>
      </h1>
      <p className="text-sm text-gray-400 max-w-xs">
        Shop the latest trends with comfort, quality and confidence.
      </p>
    </div>

    {/* Help */}
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">
        Help & Information
      </h2>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-orange-400 cursor-pointer">About Us</li>
        <li className="hover:text-orange-400 cursor-pointer">Privacy Policy</li>
        <li className="hover:text-orange-400 cursor-pointer">Terms & Conditions</li>
        <li className="hover:text-orange-400 cursor-pointer">Returns</li>
      </ul>
    </div>

    {/* About */}
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Company</h2>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-orange-400 cursor-pointer">Contact</li>
        <li className="hover:text-orange-400 cursor-pointer">Home</li>
        <li className="hover:text-orange-400 cursor-pointer">Accessories</li>
        <li className="hover:text-orange-400 cursor-pointer">Collections</li>
      </ul>
    </div>

    {/* Categories */}
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-white">Categories</h2>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-orange-400 cursor-pointer">Men</li>
        <li className="hover:text-orange-400 cursor-pointer">Women</li>
        <li className="hover:text-orange-400 cursor-pointer">Kids</li>
        <li className="hover:text-orange-400 cursor-pointer">Footwear</li>
      </ul>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="border-t border-gray-700">
    <div className="max-w-7xl mx-auto px-6 py-5 
      flex flex-wrap justify-between items-center gap-4">

      <p className="text-xs text-gray-400">
        © 2025 FashionStore. All rights reserved.
      </p>

      <div className="flex gap-6 text-2xl text-gray-400">
        <RiVisaLine className="hover:text-white transition" />
        <FaCcPaypal className="hover:text-white transition" />
        <FaCcMastercard className="hover:text-white transition" />
      </div>
    </div>
  </div>
</div>

  )
}

export default Footer