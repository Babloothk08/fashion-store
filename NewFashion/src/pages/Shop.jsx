import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Category from './Category';
import { addItem } from '../features/cart/cartSlice';
import {  useDispatch } from 'react-redux';
import Navbar from '../component/Navbar';

function Shop() {
  const [data, setData] = useState([])
  console.log(data);
  
  const dispatch = useDispatch();
  // const cart = useSelector((state) =>state.cart.item)

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get("http://localhost:5000/data")
      const allData = response.data
      setData(allData)
    }
    fetchData()
  },[])
  const filterData = data.filter((item) => item.heading === "clothes")
  


  return (
    <>
      <Navbar/>
      <div className='flex flex-wrap justify-center gap-10 py-15 max-w-full mx-10'>
      {filterData.map((item) => (
        <div key={item.id} className='w-80'>
          <Link to={`/detailPage/${item.id}`}>
             <img src={item.image} alt="" className="cursor-pointer transition-transform duration-300 hover:scale-105 rounded-2xl w-full h-99 object-cover" />
          </Link>
          <div className="  p-4">
            <div className="flex justify-between py-2">
              <div>
                <h1 className="text-xl font-semibold">{item.title}</h1>
              </div>
              <div className="flex text-yellow-400 pt-2">
                <FaStar className="" />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl">Price</h1>
              <div className="flex gap-2">
                <p className=" line-through">{item.discount}</p>
                <p className="">{item.price}</p>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <button className=" px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer" onClick={() => dispatch(addItem(item))}>
                 Add To Cart
              </button>
              <h1 className="cursor-pointer px-3 py-2 text-xl">
                <FaRegHeart />
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
    
  )
}

export default Shop
