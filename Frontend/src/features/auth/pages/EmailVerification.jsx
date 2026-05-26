import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


const EmailVerification = () => {
    const{handelemialverification}=useAuth()
    const navigate=useNavigate()
    const[searchParams]=useSearchParams()
    const token=searchParams.get("token")

    
   useEffect(() => {
    if(!token) return

    const verify=async()=>{
        try {
            const data= await handelemialverification({token})
           if(data?.user?.isVerified)
            navigate('/')
        } catch (error) {
            console.log(error)
            navigate("/login")
        }

    }

    verify()

    
    
   }, [token,handelemialverification,navigate])
   
  return (
   <main className="h-screen flex items-center justify-center">
 <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#202020] shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        
        <h1 className="text-2xl font-bold mb-2">
          Verify your email
        </h1>

        <p className="text-gray-400 text-lg mb-6">
          We’ve sent a verification link to your email.  
          Please check your inbox and verify your account to continue.
        </p>

        <div className="w-12 h-12 mx-auto mb-6 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>

       

        <p className=" text-lg text-gray-400 mt-4">
          Didn’t get it? Check spam folder.
        </p>

      </div>
    </div>

   </main>
  )
}

export default EmailVerification