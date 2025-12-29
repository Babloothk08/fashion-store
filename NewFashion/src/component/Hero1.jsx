import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";

function Hero1() {
 const [data, setData] = useState([])
//  console.log("datrat", data);
 

 useEffect(() => {
  const fetchData = async() => {
  try {
     const response = await axios.get("http://localhost:5000/banner");
    // console.log("responece", response.data)
     setData(response.data)
    }
    catch (error) {
    console.log("err", error);
   } 
  }
  fetchData();  
},[])
   
   const filterData = data.filter((items) => items.category === "Hero1")


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    centerheight: "50px",
    slidesToShow: 3,
    autoplay: true,
     autoplaySpeed: 3000,

     responsive: [
      {
        breakpoint : 1024,
        settings:{
          slidesToShow:2,
          centerPadding:"40px",
          
        },
      },
      {
        breakpoint : 768,
        settings : {
          slidesToShow: 1,
          centerPadding: "20px"
          
        },
      },
     ],
    
  };
  return (
    <div className="flex-wrap slider-container overflow-hidden ">
      <Slider {...settings}>
       {
        filterData.map((item) => (
          <div key={item.id} className="cursor-pointer transition-transform duration-300 hover:scale-110 rounded-lg shadow-lg">
            <img src={item.image} alt="" />
          </div>
        ))
       }
      </Slider>
    </div>
  );
}

export default Hero1