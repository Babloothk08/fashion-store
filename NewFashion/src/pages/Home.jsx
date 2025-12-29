import React from 'react'
// import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Hero1 from '../component/Hero1'
// import WomenFashion from '../component/WomenFashion'
// import MensFashion from '../component/MensFashion'
// import KidsFashionBoys from '../component/KidsFashionBoys'
// import KidsFashionGirls from '../component/KidsFashionGirls'
import SectionBottom from '../component/SectionBottom'
import ProductCard from './ProductCard'
// import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import AllProducts from '../component/AllProducts'
// import Footer from '../component/Footer'

// function Home({handleAddProductToCart}) {
function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <Hero/>
      <Hero1/>
      <AllProducts/>
      {/* <ProductCard handleAddProductToCart={handleAddProductToCart}/> */}
      <ProductCard />
      {/* <KidsFashionBoys />
      <KidsFashionGirls/>
      <WomenFashion/>
      <MensFashion/> */}
      <SectionBottom/>
      <Footer/>
    </div>
  )
}

export default Home