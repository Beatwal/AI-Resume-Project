import { useContext} from "react";
import { InterviewContext } from "../ibterview.context";
import { generateInterviewReport,generatePdfReport,getAllinterviewReport,getInterviewbyId, logout } from "../services/interview.api";
import { AuthContext } from "../../auth/auth.context";


export const useInterview=()=>{
    
    const context=useContext(InterviewContext)
     const authcontext=useContext(AuthContext)
    if(!context){
        throw new Error("useinterview must be used within interview provider")
        
    }
    
  
    const{setUser}=authcontext
    const {loading,setLoading,report,setReport,reports,setReports}=context
    const generateReport=async({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        try {
            const response=await generateInterviewReport({jobDescription,selfDescription,resumeFile})
          
            setReport(response.interviewReport)
return response.interviewReport
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }

    }
    const getreportbyId=async(interviewid)=>{
        setLoading(true)
        try {
            const response=await getInterviewbyId(interviewid)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }

    }
    const getReports=async()=>{
        setLoading(true)
        try {
            const response=await getAllinterviewReport()
            setReports(response.interviewReport)
            return response.interviewReport

        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }

    }
    const getResumePdf=async(interviewid)=>{
        setLoading(true)
       
        try {
            const pdfBolb=await generatePdfReport(interviewid)
            const url=window.URL.createObjectURL(pdfBolb)
            const link=document.createElement("a")
            link.herf=url
            link.setAttribute("download",`resume${interviewid}.pdf`)
            document.body.appendChild(link)
            link.click()
            
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }
   const handellogout=async()=>{
           setLoading(true)
           try {
               setUser(null)
               await logout()
               
           } catch (error) {
               console.log(error)
           }
           finally{
   
               setLoading(false)
           }
           
       }
    
    return {loading,report,reports,generateReport,getreportbyId,getReports,getResumePdf,handellogout}

}