import './App.css'
import Navbar from './component/Navbar'
import {  Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
// import Shop from './pages/Shop'
import Footer from './component/Footer'
import DetailPage from './pages/DetailPage'
import Category from './pages/Category'
import {  useState } from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Product from './pages/Product'
import AllItems from './pages/AllItems'
import Data from './pages/Data'
import UserCart from './pages/UserCart'
import LogOut from './pages/LogOut'
import ForgotPassword from './pages/ForgotPassword'
import CheckOut from './pages/CheckOut'
import Order from './pages/Order'
import OrderDetails from './pages/OrderDetails'
import SearchPage from './pages/SearchPage'
// import axios from 'axios'
import publicApi from './pages/api/publicApi.js'
import AdminComponent from './pages/AdminComponent.jsx'
import AdminNavbar from './component/AdminNavbar.jsx'

function App() {
  const [search, setSearch] = useState("")
  const [searchProduct, setSearchProduct] = useState([])


  const navigate = useNavigate()

  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")
 

  const handleSearch = () => {
    const getSearchProduct = async() => {
      if(!search.trim()){
        setSearchProduct([])
        return;
      }
        try {
          const res =await publicApi.get(`/search?q=${search}`)
           setSearchProduct(res.data);
           navigate("/searchPage");
        } catch (error) {
          console.log("search error",error)
        }
    }
    getSearchProduct()
  }


  // useEffect(() => {
  //   const getSearchProduct = async() => {
  //   if(search.trim() !== ""){
  //     const res = await axios.get( `http://localhost:8080/api/search?q=${search}`,)
  //   setSearchProduct(res.data);
  //   navigate("/searchPage");
  //   }
  //   else{
  //     setSearchProduct([])
  //   }
  // }
  // getSearchProduct()
  // },[search])
  
  return (
    <>
      {/* <BrowserRouter> */}
      {isAdminRoute ?(
        <AdminNavbar/>
      ):(
        <Navbar search = {search} setSearch = {setSearch} handleSearch = {handleSearch}/>
      )}
       <Routes>
        <Route path='/home' element = {<Home />}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/contact' element = {<Contact/>}/>
        {/* <Route path='/shop' element = {<Shop handleAddProductToCart = {handleAddProductToCart}/>}/> */}
        {/* <Route path='/cart' element = {<Cart addCart = {addCart} setAddCart ={setAddCart}/>}/> */}
        <Route path= '/detailPage/:id' element = {<DetailPage />}/>
        {/* <Route path='/:category/:name' element={<Category handleAddProductToCart = {handleAddProductToCart}/>}/> */}
        <Route path='/' element = {<SignIn/>}/>
        <Route path='/signUp' element = {<SignUp/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/productAccess' element = {<Product/>}/>
        <Route path='/allItem' element = {<AllItems/>}/>
        <Route path='/data' element = {<Data/>}/>
        <Route path='/userCart' element = {<UserCart/>}/>
        <Route path='logOut' element = {<LogOut/>}/>
        <Route path='forgotPassword' element = {<ForgotPassword/>}/>
        <Route path='checkout' element = {<CheckOut/>}/>
        <Route path='order' element = {<Order/>}/>
        <Route path='orderdetails' element = {<OrderDetails/>}/>
        <Route path='searchPage' element = {<SearchPage searchProduct = {searchProduct}/>}/>
        <Route path='admin' element = {<AdminComponent/>}/>
        {/* <Route path='/product' element = {<Product/>}/> */}
        {/* <Route path='/productCard' element = {<ProductCard/>}/> */}
       </Routes>
      {/* </BrowserRouter> */}
      
    </>
  )
}

export default App
