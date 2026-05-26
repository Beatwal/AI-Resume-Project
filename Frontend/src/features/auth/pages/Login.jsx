import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const Navigate=useNavigate()
  const{loading,handlelogin,handelgooglelogin}= useAuth()
    const [email, setEmail] = useState("")
    const [password, setPasswrod] = useState("")
    const SubmitHandler=async(e)=>{
      e.preventDefault()
        try {
          await handlelogin({email,password})
         Navigate('/')
        } catch (error) {
          console.log(error)
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
          Login
        </h1>
        <form onSubmit={SubmitHandler} className="flex flex-col justify-center gap-3 mt-3">
          <div className="input-group w-full  flex flex-col justify-between gap-2">
            <label className="text-lg font-semibold" htmlFor="email">
              Email
            </label>
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }}
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg"
              placeholder="Enter Email-Address"
              value={email}
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
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg"
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <Link className=" text-blue-500 inline-block text-right " to={"/forgot_password"}>forgot password?</Link>

          </div>
          <button className="bg-green-600 cursor-pointer active:scale-99 px-2 py-2 rounded-lg text-lg mt-2" type="submit">Login</button>
        </form>
        <div className="or flex items-center justify-center gap-1 mt-5 ">
          <div className="w-[50%] border h-0 border-gray-500"></div>
          <p>or</p>
          <div className="w-[50%] border h-0 border-gray-500"></div>
        </div>
        <div className="social-auth flex flex-col gap-3">
          <button onClick={async()=>{
            handelgooglelogin()
            
          }} className="rounded-lg w-full cursor-pointer active:scale-99 px-16 bg-[#262C36] flex items-center justify-between "><img className="w-12" src="/images/google.png" alt="Something" />Continue with Google</button>
          <button className="rounded-lg cursor-pointer active:scale-99 w-full  px-16 bg-[#262C36] flex items-center justify-between "><img className="w-12" src="/images/facebook.png" alt="Something" />Continue with Facebook</button>
          <button className="rounded-lg cursor-pointer active:scale-99 w-full px-16 bg-[#262C36] flex items-center justify-between "><img className="w-12" src="/images/apple.png" alt="Something" />Continue with Apple</button>
          <div className="flex items-center justify-center gap-2 text-lg">
          <p>New User?</p>
          <Link className=" text-blue-500 inline-block text-right " to={"/register"}>create an account</Link>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
