import React, {  useEffect, useState } from 'react'
import publicApi from "../pages/api/publicApi.js"

function ManagerComponent() {
    const [user, setUser] = useState([])
   
    

   const getUser = async() => {
    try {
        const token = localStorage.getItem("token")
        console.log("token", token);
        const res = await publicApi.get("/manager/users",{
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        })
        console.log("res",res.data.data);
        setUser(res.data.data)
         console.log("managerUser",user);
        
    } catch (error) {
        console.log("error fetching data", error)
    }
   }

   useEffect(()=>{
    getUser()
   },[])

  return (
    <div className='mt-20 px-20'>
    <section>
        <h2 className='text-2xl py-5'>Manager Dashboard</h2>
        <table className='w-full'>
            <thead className=''>
                <tr className=' '>
                   <th className='border px-2 py-1'>Name</th>
                   <th className='border px-2 py-1'>Email</th>
                   <th className='border px-2 py-1'>Orders</th>
                   <th className='border px-2 py-1'>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border px-2 py-1'>huk</td>
                    <td className='border px-2 py-1'></td>
                    <td className='border px-2 py-1'></td>
                    <td className='border px-2 py-1'></td>
                </tr>
            </tbody>
        </table>
    </section>
    </div>
  )
}

export default ManagerComponent
