import axios from "axios"
const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
export const generateInterviewReport=async({jobDescription,selfDescription,resumeFile},)=>{
const formdata=new FormData()
formdata.append("JobDescription",jobDescription)
formdata.append("selfDescription",selfDescription)
formdata.append("resume",resumeFile)
try {
    
    const response=await api.post("/api/interview",formdata,{headers:{"Content-Type":"multipart/form-data"}})
    return response.data
} catch (error) {
    console.error(error)
}
}
export const getInterviewbyId=async(interviewId)=>{
    try {
        
        const response=await api.get(`/api/interview/report/${interviewId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export const getAllinterviewReport=async()=>{
    try {
        const response=await api.get("/api/interview/")
        return response.data
    } catch (error) {
          console.error(error)
    }
}
export async function logout() {
  try {
    const response=await api.post('/api/auth/logout',)
    return response.data

  } catch (error) {
    console.log(error)
  }
}
export const generatePdfReport=async (interviewId)=>{
try {
    const response=await api.post(`/api/interview/resume/pdf/${interviewId}`,{responseType:"blob"})
    console.log("this is something pdf",response.data)
    return response.data
    
} catch (error) {
    console.error(error)
}
}

