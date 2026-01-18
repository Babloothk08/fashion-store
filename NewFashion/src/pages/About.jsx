import React from 'react'
import Footer from '../component/Footer'

function About() {
  return (
    <>
       <div className='bg-[url("https://www.alnylam.com/sites/default/files/2024-12/fishing-old-man-desktop.jpg")] bg-center bg-cover w-full h-50 md:h-[500px]   text-start content-center md:pl-20 mt-12'>
      </div>
      <div className='relative w-full h-full pt-15'>
        <div className='px-5 md:px-26'>
            <div className=''>
                <h1 className='text-4xl'>Who We Are ?</h1>
                <p className='text-base text-gray-700 max-w-7xl py-4'>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or- less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for.<br></br><br></br>
                    Since I’ve shared a lot of our favorites in the past posts, I’m just going highlight my favorites from this trip like what to eat where to stay, and where to play (beaches, hikes, etc.)
                </p>
            </div>
            <div className='py-5 pb-7 md:flex gap-4  '>
                <div className='py-5'>
                    <h1 className='py-2 text-2xl font-sans'>About Us</h1>
                    <p className=''>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in to some form by injected humor..</p>
                </div>
                <div className='py-5'>
                    <h1 className='py-2 text-2xl font-sans'>Our Story</h1>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in to some form by injected humor..</p>
                </div>
                <div className='py-5'>
                    <h1 className='py-2 text-2xl font-sans'>Our Mission</h1>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in to some form by injected humor..</p>
                </div>
            </div>
        </div>
    </div>
    <div className="mt-20 max-w-full md:mx-12 mx-6 text-center bg-white border border-blue-300 rounded-3xl p-12 mb-20 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Still have questions?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            If you couldn't find an answer to your question, our support team is ready to help.
          </p>
          <a
            href="/contact" // Replace with your contact page link
            className="inline-block bg-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-red-700"
          >
            Contact Support
          </a>
        </div>
        <Footer/>
    </>
  )
}

export default About