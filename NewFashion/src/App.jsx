import './App.css'
import Navbar from './component/Navbar'
import {  Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import DetailPage from './pages/DetailPage'
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
import publicApi from './pages/api/publicApi.js'
import AdminComponent from './pages/AdminComponent.jsx'
import AdminNavbar from './component/AdminNavbar.jsx'
import AllProducts from './component/AllProducts.jsx'
import ManagerComponent from './pages/ManagerComponent.jsx'

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
        <Route path= '/detailPage/:id' element = {<DetailPage />}/>
        <Route path='/' element = {<SignIn/>}/>
        <Route path='/signUp' element = {<SignUp/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/admin/product' element = {<Product/>}/>
        <Route path='/allItem' element = {<AllItems/>}/>
        <Route path='/data' element = {<Data/>}/>
        <Route path='/userCart' element = {<UserCart/>}/>
        <Route path='/logOut' element = {<LogOut/>}/>
        <Route path='/forgotPassword' element = {<ForgotPassword/>}/>
        <Route path='/checkout' element = {<CheckOut/>}/>
        <Route path='/order' element = {<Order/>}/>
        <Route path='/orderdetails' element = {<OrderDetails/>}/>
        <Route path='/searchPage' element = {<SearchPage searchProduct = {searchProduct}/>}/>
        <Route path='/admin' element = {<AdminComponent/>}/>
        <Route path='/admin/allProducts' element = {<AllProducts/>}/>
        <Route path='/manager' element = {<ManagerComponent/>}/>
       </Routes>
      {/* </BrowserRouter> */}
      
    </>
  )
}

export default App
