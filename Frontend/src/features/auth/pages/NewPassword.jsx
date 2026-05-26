import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const NewPassword = () => {
    const navigate=useNavigate()
    const{loading,handelresetPassword}=useAuth()
    const [password, setPassword] = useState("")

    const SubmitHandler=async(e)=>{
      e.preventDefault()
        try {
         const data= await handelresetPassword({password})
          
          if(data){

            navigate('/')
          }
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
    <main className="h-screen flex items-center justify-center" >
              <div className="formgroup h-[80%] w-[25%] px-3 py-5 ">
        <h1 className="flex items-center justify-center text-gray-100 text-2xl font-extrabold">
          New Password
        </h1>
        <form onSubmit={SubmitHandler} className="flex flex-col justify-center gap-3 mt-3">
          <div className="input-group w-full  flex flex-col justify-between gap-2">
            <label className="text-lg font-semibold" htmlFor="password">
             New Password
            </label>
            <input  onChange={(e)=>{
                setPassword(e.target.value)
            }}
              className="outline-none border-[1.5px] w-full border-gray-500 py-2 px-3 text-lg rounded-lg"
              placeholder="Enter New Password"
                value={password}
              type="password"
              name="password"
              id="password"
            />
          </div>
          
           
          <button className="bg-green-600 cursor-pointer active:scale-99 px-2 py-2 rounded-lg text-lg mt-2" type="submit">Send</button>
        </form>
        </div>
    </main>
  )
}

export default NewPassword