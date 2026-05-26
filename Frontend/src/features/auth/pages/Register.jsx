import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
const Register = () => {
 const {loading,handleregister}= useAuth()
 const [username, setUsername] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPasswrod] = useState("")
 const Navigate=useNavigate()
    const SubmitHandler=async(e)=>{
        
        e.preventDefault()
        try {
          
          let data= await handleregister({username:username,
             email:email,
             password:password})
             if(data){

               Navigate("/email_verify")
             }
          
            
        } catch (error) {
         console.log(error) 
        }
       
    }
    if(loading){
      return <main className="h-screen flex items-center justify-center text-6xl">
        
  <div className="w-14 h-14 rounded-full border-8 border-white/30 border-t-white animate-spin"></div>

        <h1> loading....</h1>
      </main>
    }
  return (
     <main className="h-screen flex items-center justify-center">
        
      <div className="formgroup h-[80%] w-[25%] px-3 py-5 ">
        <h1 className="flex items-center justify-center text-gray-100 text-2xl font-extrabold">
         Register for new account
        </h1>
        <form onSubmit={SubmitHandler} className="flex flex-col justify-center gap-3 mt-5">
          <div className="input-group w-full  flex flex-col justify-between gap-2">
            <label className="text-lg font-semibold" htmlFor="username">
              Username
            </label>
            <input 
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            value={username}
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg"
              placeholder="Enter Username"
              type="username"
              name="username"
              id="username"
            />
          </div>
          <div className="input-group w-full  flex  flex-col justify-between gap-2">
            <label className="text-lg font-semibold" htmlFor="email">
              Email
            </label>
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }}
              value={email}
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg"
              placeholder="Enter Email-Address"
              type="email"
              name="email"
              id="email"
            />
          </div>
          
            <div className="flex flex-col justify-center gap-1 mt-1 ">
          <div className="input-group w-full  flex flex-col justify-between gap-2">
            <label className="text-lg font-semibold" htmlFor="password">
              Password
            </label>
            <input
            onChange={(e)=>{
             setPasswrod(e.target.value)
            }}
            value={password}
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <div className='flex items-center right-0 justify-end gap-2 text-lg'>
         <p>already have account?</p>
          <Link className=" text-blue-500 inline-block text-right " to={"/login"}>Login</Link>
          </div>

          </div>
          <button  className="bg-green-600 cursor-pointer active:scale-99 px-2 py-2 rounded-lg text-lg mt-2" type="submit">Register</button>
        </form>
        
       
      </div>
    </main>
  )
}

export default Register