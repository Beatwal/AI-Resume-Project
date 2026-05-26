import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { emialverify, getme, login, resetPassword, User_Register, veryfiyOTP,sentOTP, googleLogin } from "../services/auth.api.js";
import { useEffect } from "react";


export const useAuth=()=>{
   
    const context=useContext(AuthContext)
    let{user,setUser,loading,setLoading,isVerified,setIsVerified}=context

    const handlelogin=async({email,password})=>{
        setLoading(true)
        try {
            
            const data= await login({email,password})
            setUser(data.user)
            setIsVerified(data.user.isVerified)
            
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
        finally{

            setLoading(false)
        }

    }
    const handleregister=async({username,email,password})=>{
        setLoading(true)
        try {
            
            const data=await User_Register({username,email,password})
            setUser(data.user)
             setIsVerified(data.user.isVerified)
            return data
        } catch (error) {
         console.log(error)
           throw error
        }
        finally{

            setLoading(false)
        }
    }

    const handelgooglelogin=async()=>{
        
    
            const res= await googleLogin()
            return res
            
        
    
    }
    const handelverfiyOTP=async({OTP})=>{
        setLoading(true)
        try {
            
            const res=await veryfiyOTP({OTP})
            if(!res?.success){
                throw new Error(res?.message || "OTP Verification failed!")
            }
            setUser(null)
            return res
             
        } catch (error) {
            console.log(error)
            throw error
            
        }
        finally{

            setLoading(false)
        }
    }
    const handelresetPassword=async({password})=>{
        setLoading(true)
        try {
            
            const data=await resetPassword({password})
            setUser(data.user)
            return data
        } catch (error) {
            console.log(error)
        }
        finally{

            setLoading(false)
        }
    }
    const handelemialverification=async({token})=>{
        setLoading(true)
        try {
            
            const data=await emialverify({token})
            setUser(data.user)
             setIsVerified(data.user.isVerified)
             return data
        } catch (error) {
            console.log(error)
        }
        finally{

            setLoading(false)
        }
    }
    const handelsendOTP=async({email})=>{
        setLoading(true)
        try {
            const data=await sentOTP({email})
            
            setIsVerified(data.user.isVerified)
            return data
            
        } catch (error) {
            console.log(error)

            
        }
        finally{
            setLoading(false)
        }
    }
    const handelgetme=async()=>{
        setLoading(true)
        try {
            
            const data=await getme()
            if(data && data.user){

                setUser(data.user)
                return data
            }else {
      setUser(null)  
    }
        } catch (error) {
            console.log(error)
            setUser(null)
        }
        finally{

            setLoading(false)
        }
    }
     useEffect(() => {
    
      const GetandSetUser=async()=>{
       try {
         const data=await getme()
         if(data?.user){

             setUser(data.user)
              setIsVerified(data.user.isVerified)
              return data
         }
         
       } catch (error) {
        setUser(null)
        console.log(error)
      

       } finally{
        setLoading(false)
       }
      

      }
      GetandSetUser()
    }, [])

    return{user,

        setUser,
        setIsVerified,
        isVerified,
        loading,
        setLoading,
        handlelogin,
        handleregister,
        handelverfiyOTP,
        handelresetPassword,
        handelemialverification,
        handelgetme,
        handelsendOTP,
        handelgooglelogin

    }


}