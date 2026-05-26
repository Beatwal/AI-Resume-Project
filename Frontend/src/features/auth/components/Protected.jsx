import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
   let {loading,user,isVerified}=useAuth()
   if(loading){
     return <main className="h-screen flex items-center justify-center text-6xl">
        
  <div className="w-14 h-14 rounded-full border-8 border-white/30 border-t-white animate-spin"></div>

        <h1> loading....</h1>
      </main>
   }
   if(!user){

    return <Navigate to={'/login'}/>
   }

   if (!isVerified) {
     return <Navigate to={"/email_verify"} />;
   }
   
  return children
  
}

export default Protected