import axios from "axios"
const api=axios.create({
    baseURL:"https://ai-resume-project-dnn4.onrender.com/",
    withCredentials:true
})
//username email password
export async function User_Register({username, email, password}){
 try {
       
     const response=await api.post('/api/auth/register',{username,email,password})
     return response.data
    
 } catch (error) {
    console.log(error)
 }
}
//email and password
export async function login({email,password}) {
try {
    const response=await api.post('/api/auth/login',{email,password},)
    return response.data
} catch (error) {
    console.log(error)
}    
}
//token
export  async function emialverify({token}){

  try {
      const response=await api.get("/api/auth/email-verify",{
        params:{token},
        
  })
  return response.data
  } catch (error) {
    console.log(error)
  }

}
//email
export async function sentOTP({email}) {
try {
    const response=await api.post('/api/auth/forgotpassword/sendOTP',{email},{withCredentials:false})
    return response.data
} catch (error) {
    console.log(error)
    
}
}
//OTP 
export async function veryfiyOTP({OTP}) {
    try {
        const response=await api.post("/api/auth/forgotpassword/veryfiyOTP",{OTP})
        return response.data
    } catch (error) {
        console.log(error)
    }
    
    
}
//password
export async function resetPassword({password}) {
    try {
        const response=await api.post("/api/auth/resetpassword",{password},)
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}
//googleLogin
export function googleLogin(){

      window.location.href = "http://localhost:3000/auth/google"
    
}


//getMe
export async function getme() {
  try {
      const response=await api.get("/api/auth/get-me",)
      return response.data
  } catch (error) {
      if (error.response?.status === 401) {
      return null
    }
    throw error
  }
    
}