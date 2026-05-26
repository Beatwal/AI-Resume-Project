import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const OTPverification = () => {
  const [otp, setOTP] = useState(['','','','','',''])
  const inputRef=useRef([])
  const navigate=useNavigate()
    const{loading,handelverfiyOTP}= useAuth()
    const SubmitHandler=async(e)=>{
        e.preventDefault()
        try {
        const finalOtp=otp.join("")
        const data=await handelverfiyOTP({OTP:finalOtp})
        if(data?.success){

          navigate("/resetpassword")
        }
        
        
      } catch (error) {
        console.log(error)
        
      }
     
      
    }
    const handelCancle=()=>{
 navigate("//forgot_password")
    }
    const handelChange=(e,index)=>{
     
     
              const digit = e.target.value.replace(/\D/g, "")
              if (!digit) return
             const newOtp=[...otp]
             newOtp[index]=digit[0]
             setOTP(newOtp)
             inputRef.current[index+1]?.focus()
    }
    const keyhandel=(e,idx)=>{
  
     if(e.key==="ArrowRight"){
      inputRef.current[idx+1]?.focus()
     }
     if(e.key==="ArrowLeft"){
      inputRef.current[idx-1]?.focus()
    }
    if(e.key==="Delete"){
      if(otp[idx]){

        const newotp=[...otp]
        newotp[idx]=''
        setOTP(newotp)
      }
      else {

        inputRef.current[idx-1]?.focus()
      }

    }
    if(e.key==="Backspace"){
      if(otp[idx]){

        const newotp=[...otp]
        newotp[idx]=''
        setOTP(newotp)
      }

  else{

    inputRef.current[idx-1]?.focus()
  }
    }}
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
          Confrim your account
        </h1>
        <p className='text-lg mt-2 text-gray-400'>please enter OTP (One-Time Password) sent to your registered email to complete your verification.</p>
        <form onSubmit={SubmitHandler} className="flex flex-col justify-center gap-3 mt-3">
          <div className="input-group w-full  flex  items-center justify-between gap-2">
          {otp.map((e,idx)=>{
            return   <input key={idx}
            onChange={(e)=>{handelChange(e,idx)}}
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg"
              onKeyDown={(e)=>{keyhandel(e,idx)}}
              type="text"
              maxLength={1}
              ref={(e)=>{inputRef.current[idx]=e}}
              inputMode="numeric"
              pattern='[0-9]*'
              name="otp"
              id={idx}
              value={otp[idx]}
            />
          })}
            
          
            
          </div>
          
            <div className="flex items-center  justify-end gap-1 mt-1 ">
          <p>Don't got the code?</p>
          <p className=" text-blue-500 inline-block text-right cursor-pointer " >Resend</p>

          </div>
          <button  className="bg-green-600 cursor-pointer active:scale-99 px-2 py-2 rounded-lg text-lg mt-2" type="submit">Verify</button>
          <button onClick={handelCancle} className="bg-red-500 cursor-pointer active:scale-99 px-2 py-2 rounded-lg text-lg mt-2">Cancel</button>
        </form>
       

         
        
      </div>
    </main>
  )
}

export default OTPverification