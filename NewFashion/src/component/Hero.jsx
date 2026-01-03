import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true
  };
  return (
    <div className="slider-container pt-18 w-full overflow-hidden">
      <Slider {...settings} >
        <div className=' '>
          <img src="https://www.jockey.in/cdn/shop/files/3-MIW-Desktop.webp?v=1750847852&width=1600" alt=""className='w-full object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]' />
        </div>
        <div>
          <img src="https://www.jockey.in/cdn/shop/files/4-WOW-Desktop.webp?v=1750847944&width=1600" alt=""className='w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover'  />
        </div>
        <div>
          <img src="https://www.jockey.in/cdn/shop/files/2-Groove-Desktop.webp?v=1750943150&width=1600" alt="" className='w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover' />
        </div>
        <div>
          <img src="https://www.jockey.in/cdn/shop/files/1-WIW-Desktop.webp?v=1750847756&width=1600" alt=""className='w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover'  />
        </div>
        <div>
          <img src="https://images.bewakoof.com/uploads/grid/app/1x1-earlywinter-rm-2-1756993733.jpg" alt=""className='w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover'  />
        </div>
        <div>
          <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Baki_Hanma_-_Son_of_ogre_-Homepage_Banner.jpg?w=1500&dpr=1.3" alt=""className='w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover'  />
        </div>
      </Slider>
      
    </div>
  );
}

export default Hero