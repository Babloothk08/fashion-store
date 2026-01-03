import React from 'react'
import Hero from '../component/Hero'
import SectionBottom from '../component/SectionBottom'
import Footer from '../component/Footer'
import AllProducts from '../component/AllProducts'
function Home() {
  return (
    <div>
      <Hero/>
      <AllProducts/>
      <SectionBottom/>
      <Footer/>
    </div>
  )
}

export default Home