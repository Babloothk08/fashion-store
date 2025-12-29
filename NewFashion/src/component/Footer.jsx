import React from 'react'
import { RiVisaLine } from "react-icons/ri";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";

function Footer() {
  return (
    <div className=' bg-[#d8dbac] "> shadow-4xl'>
        <div className='flex flex-wrap justify-around max-sm:flex-col max-sm:gap-5 max-md:flex-col max-md:gap-5 py-10 '>
            <div className='flex flex-col justify-center content-center text-center max-sm:items-center max-md:gap-3 max-md:items-center max-sm:gap-3 text-xl'>
                <img src="https://t3.ftcdn.net/jpg/16/60/75/60/240_F_1660756002_ii43fIj08wo6bbFdWbxmMD7zsZFoUxpR.jpg" alt="logo"className='h-16 w-24   ' />
                <h1 className=''>Shop As Per Your Fashion</h1>
                <p></p>
            </div>
            <div className='flex flex-col text-center '>
                <h1 className='text-2xl'>HELP & INFORMATION</h1>
                <ul className='pt-3 flex flex-col gap-1 cursor-pointer '>
                    <li className='hover:text-orange-600 hover:font-bold'>About Us</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Privacy Policy</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Terms & Conditions</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Products Return</li>
                </ul>
            </div>
            <div className='flex flex-col text-center '>
                <h1 className='text-2xl '>ABOUT US</h1>
                <ul className='pt-3 flex flex-col gap-1 cursor-pointer'>
                    <li className='hover:text-orange-600 hover:font-bold'>Contact</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Home Page</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Terms & Conditions</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Accessories</li>
                </ul>
            </div>
            <div className='flex flex-col text-center '>
                <h1 className='text-2xl '>CATEGORIES</h1>
                <ul className='pt-3 flex flex-col gap-1 cursor-pointer'>
                    <li className='hover:text-orange-600 hover:font-bold'>Menu Item</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Help Center</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Address Store</li>
                    <li className='hover:text-orange-600 hover:font-bold'>Privacy Policy</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-wrap justify-between mx-20 max-sm:gap-5 max-sm:justify-center '>
            <div>
                <p>© 2025 Totes. All Rights Reserved.</p>
            </div>
            <div className='flex gap-10 text-2xl pb-5'>
                <RiVisaLine />
                <FaCcPaypal />
                <FaCcMastercard />
            </div>
        </div>
    </div>
  )
}

export default Footer