import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
import { uploadResume } from "../middlewares/multer.middelware.js";
import {generateResumePdfController, getallInterviewReport, getInterviewReport, interviewReport } from "../controllers/interview.controller.js";
const interviewRoute=Router()

interviewRoute.post("/",authenticationMiddleware,uploadResume.single("resume"),interviewReport)
interviewRoute.get("/report/:interviewId",authenticationMiddleware,getInterviewReport)
interviewRoute.get("/",authenticationMiddleware,getallInterviewReport)
interviewRoute.post("/resume/pdf/:interviewReportId",authenticationMiddleware,generateResumePdfController)
export default interviewRoute