import React from 'react'
import Navbar from '../component/Navbar'

function Contact() {
  return (
    <>
     <Navbar/>
     <div className='bg-[url("https://www.jockey.in/cdn/shop/files/4-WOW-Desktop.webp?v=1750847944&width=1600")] bg-center bg-cover w-full h-40 md:h-[500px]   text-start content-center md:pl-20 mt-15'></div>
      <div className='flex flex-col flex-wrap text-center mt-20 py-8 gap-8 bg-[url("https://im.uniqlo.com/global-cms/spa/res14b211448e71458d65022e07451b7507fr.jpg")]bg-cover bg-center '>
      <div className='text-center text-4xl font-semibold'>
        <h1>Contact Us</h1>
      </div>
      <div className='flex flex-wrap justify-center gap-2 max-sm:gap-6 max-md:gap-6 max-lg:gap-6'>
        <input type="text" placeholder='Your Name' className='border-1 w-xl max-sm:w-99 h-13 rounded-xl p-8 cursor-pointer' />
        <input type="text" placeholder='Your Email' className='border-1 w-xl max-sm:w-99 h-13 rounded-xl p-8 cursor-pointer' />
      </div>
      <div className='flex flex-wrap justify-center gap-2  max-sm:gap-6 max-md:gap-6 max-lg:gap-6'>
        <input type="text" placeholder='Your Phone' className='border-1 w-xl max-sm:w-99 h-13 rounded-xl p-8 cursor-pointer'/>
        <input type="text" placeholder='Subject' className='border-1 w-xl h-13 max-sm:w-99 rounded-xl p-8 cursor-pointer' />
      </div>
      <div className='flex justify-center gap-2'>
        <input type="text" placeholder='Write Your Message...' className='border-1 w-6xl h-13  max-sm:w-99 max-md:w-xl max-lg:w-xl max-xl:xl  rounded-xl p-8 cursor-pointer' />
      </div>
      <div className='w-full'>
        <button className='w-60 h-12 rounded-2xl bg-green-700 text-white cursor-pointer'>Send Message</button>
      </div>
    </div>
    </>
  )
}

export default Contact