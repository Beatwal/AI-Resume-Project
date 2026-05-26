import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Forgotpassword = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("")
  const{loading,handelsendOTP}=useAuth()
    
    const SubmitHandler=async(e)=>{
        
        e.preventDefault()
       const data=await handelsendOTP({email})
       if(data?.user){

         navigate("/otpverification")
       }
      


    }
     if(loading){
      return<main className="h-screen flex items-center justify-center text-6xl">
        
  <div className="w-14 h-14 rounded-full border-8 border-white/30 border-t-white animate-spin"></div>

        <h1> loading....</h1>
      </main>
    }
  return (
<main className="h-screen flex items-center justify-center">
   
      <div className="formgroup h-[80%] w-[25%] px-3 py-5 ">
        <h1 className="flex items-center justify-center text-gray-100 text-2xl font-extrabold">
        Find Your Account
        </h1>
        <p className='text-gray-400 text-lg'>Enter your email-adress</p>
        <form onSubmit={SubmitHandler} className="flex flex-col justify-center gap-5 mt-5">
         <div className="input-group w-full  flex flex-col justify-between gap-2">
            <label className="text-lg font-semibold" htmlFor="email">
              Email
            </label>
            <input onChange={(e)=>{
            setEmail(e.target.value)
            }} 
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg" value={email}
              placeholder="Enter Email-Address"
              type="email"
              name="email"
              id="email"
            />
          </div>
         
          
            <div className="flex flex-col justify-center gap-1 mt-1 ">
         
          <div className='flex items-center right-0 justify-end gap-2 text-lg'>
         <p>already have account?</p>
          <Link className=" text-blue-500 inline-block text-right " to={"/login"}>Login</Link>
          </div>

          </div>
          <button className="bg-green-600 px-2 py-2 cursor-pointer active:scale-99 rounded-lg text-lg mt-2" type="submit">Send OTP</button>
        </form>
        
       
      </div>
    </main>
  )
}

export default Forgotpassword