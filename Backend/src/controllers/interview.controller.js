import { json } from "zod"
import { interviewModel } from "../models/interviewReport.model.js"
import { generateInterviewReport ,generateResumePdf} from "../services/ai.service.js"
import { PDFParse } from 'pdf-parse'




const interviewReport=async(req,res)=>{
    
    const PdfData=new PDFParse(Uint8Array.from(req.file.buffer))
    const ResumeContent=await PdfData.getText()
    const{selfDescription,JobDescription}=req.body
    const interviewReportbyAI=await generateInterviewReport({resume:ResumeContent.text,selfDescription,JobDescription})
   
    const interviewReport=await interviewModel.create({
        user:req.user._id,
        jobDescription:JobDescription,
        resumeText:ResumeContent.text,
        selfDescription,
        ...interviewReportbyAI
    })
    res
    .status(201)
    .json({message:"interview Report generated successfully!",interviewReport})
    
}
const getInterviewReport=async(req,res)=>{
    const interviewid=req.params.interviewId
    
   
  
    const interviewReport=await interviewModel.findOne({_id:interviewid,user:req.user.id})
     if(!interviewReport){
        return res
        .status(404)
        .json({message:"Interview Report not found"})
     }
     return res.
     status(200)
     .json({message:"Interview report fetched successfully!",interviewReport})
}
const getallInterviewReport=async(req,res)=>{
    const interviewReport=await interviewModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resumeText -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan")
    return res.status(200).json({
            message: "Reports fetched successfully",
            interviewReport
        })
}
const generateResumePdfController=async(req,res)=>{
    const{interviewReportId}=req.params
    const resumeReport=await interviewModel.findById(interviewReportId)
    if(!resumeReport){
        return res
        .status(404)
        .json({message:"Interview Report not found"})
    }
  const  {jobDescription,resumeText,selfDescription}=resumeReport
  const Pdfbuffer=await generateResumePdf({resume:resumeText,selfDescription,jobDescription})
  res.set({
    "Content-Type":"application/pdf",
    "Content-Disposition":`attachment; filename=resume_${interviewReportId}.pdf`
  })
 res.send(Pdfbuffer)
}
export {interviewReport,getInterviewReport,getallInterviewReport,generateResumePdfController}