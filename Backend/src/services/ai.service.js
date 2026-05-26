import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer"




const interviewReportSchema=z.object({
    matchScore:z.number().default(0).describe("A score between 0 to 100 indicating how well candidate's profile match the job describe"),
  technicalQuestion:z.array(z.object({  question:z.string().describe("The Techinical question  can ask in the interview"),
    intention:z.string().describe("The intention of interviewer behind asking of this question"),
    answer:z.string().describe("How to answer this question what point to cover ,what approach to take etc")})).default([]).describe("Techinical question that can be asked in interview along with their intention"),
    behavioralQuestion:z.array(z.object({
        question:z.string().describe("The Behavior question  can ask in the interview"),
    intention:z.string().describe("The intention of interviewer behind asking of this question"),
    answer:z.string().describe("How to answer this question what point to cover ,what approach to take etc")
    })).default([]).describe("Behavior question that can be asked in interview along with their intention"),
 skillGap:z.array(z.object({
    skill:z.string().describe("The skill which the candidate iis lacking"),
    severity:z.enum(["low"||"LOW","medium"||"MEDIUM","high"||"HIGH"]).describe("The severity of the skill gap,i.e, how important is the sill for the job")

 })).default([]).describe("list skill gaps in the candidate's profile along with their severity"),
 preparationPlan:z.array(z.object({
     day:z.number().describe("the day number in the preparation plan starting from 1"),
     focus:z.string().describe("The main focus of this in the preparation plan,e.g data stracture,system design, mock interview"),
     tasks:z.array(z.string()).describe("List of the tasks to be done on this day to follow the preparation plan ,e.g read a specific book on following day")
 })).default([]).describe("a day wise preparation plan for candidate to follow in on specific date"),
 title:z.string().describe("The title of the job for which the interview report is generated")

})
const generateInterviewReport=async({resume,selfDescription, JobDescription})=>{
  const ai = new GoogleGenAI({
apiKey:process.env.GEMINI_API_KEY
});
  const prompt =`
       You are an Expert HR Analyst and Technical Interview Coach.

Analyze the candidate Resume, Self Description, and Job Description.

IMPORTANT RULES:
1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT use json.
4. Do NOT add explanations outside JSON.
5. technicalQuestion MUST be an array of objects.
6. behavioralQuestion MUST be an array of objects.
7. Every technicalQuestion object MUST contain:
   - question
   - intention
   - answer
8. Every behavioralQuestion object MUST contain:
   - question
   - intention
   - answer
9. preparationPlan MUST be an array of objects.
10. matchScore MUST be a number between 0 and 100.

STRICT JSON FORMAT:

{
  "matchScore": 85,

  "technicalQuestion": [
    {
      "question": "What is JWT authentication?",
      "intention": "Check backend authentication knowledge",
      "answer": "Explain JWT structure, token verification, expiration, and authentication flow.(#this should be proper answer)"
    }
  ],

  "behavioralQuestion": [
    {
      "question": "Describe a difficult bug you solved.",
      "intention": "Evaluate problem solving ability",
      "answer": "Explain the issue, debugging process, solution, and lessons learned.(#this should be proper answer)"
    }
  ],

  "skillGap": [
    {
      "skill": "System Design",
      "severity": "medium" only must be among these["high","medium","low"]
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "JavaScript Fundamentals",
      "tasks": [
        "Review closures",
        "Practice async await",
        "Solve 5 JS interview questions"
      ]
    }
  ],
  title:("The title of the job for which the interview report is generated")"
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${JobDescription}
    `;
  try {
    
  } catch (error) {
    
  }

    try {
        const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
        ,
      },
    });
    
const rawText = response.candidates[0].content.parts[0].text
    const jsonObjet=JSON.parse(rawText)
    console.log("before data validation",jsonObjet)
        const validatedResponse =interviewReportSchema.parse(jsonObjet);
    console.log("Success! Validated data",validatedResponse)
    return validatedResponse
    } catch (error) {
       if (error instanceof z.ZodError) {
            console.error("ZOD VALIDATION FAILED. AI SENT BAD DATA:", JSON.stringify(error.format(), null, 2));
        } else {
            console.error("AI Service Error:", error);
        }
        throw error;
    }

};
const generatePdfFromhtml=async(htmlContent)=>{
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(htmlContent,{ waitUntil:'domcontentloaded'})
const pdfBuffer=await page.pdf({format:"A4"})
await browser.close()
return pdfBuffer
}
const generateResumePdf=async({resume,selfDescription,JobDescription})=>{
  const ai = new GoogleGenAI({
apiKey:process.env.GEMINI_API_KEY
});
  const resumepdfSchema=z.object({
    html:z.string().describe("The HTML content of the resume which  can be converted to PDF by using any libarary like Puppetter")
  })
  const prompt=`Generate a resume for a candidate with the following  details 
  Resume :${resume}
  selfDescription:${selfDescription}
  jobDescription:${JobDescription}
  
  The response shold be  a JSon object with a single filed "html" which contains the HTML content of the resume which can be converted to PDF using any libarary like Puppetter.
  The resume should be tailored for the given job description and should highlight the candidate strength and relevant exprience.The HTML content should be well formatted and structured,making it easy to read and visible.
  The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
  You can highlight the content using some color or different font styles but the overall design should be simple and professional.
  The content should be ATS fridnely i.e. it should be  easily parsable by ARS systems without losing important information.
  The resume should not be so lengthy, it should  ideally be 1-2 pages long when converted to PDF, focus on qualityy rather thab quantity and make sure to include all the relevant information that can increase the candidate chance of getting an interview call for the given job description`

  const response = await ai.models.generateContent({
   model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
        ,
      },
  })
  const json=JSON.parse(response.text)
  const pdfBuffer=await generatePdfFromhtml(json.html)
  return pdfBuffer
}

export {generateInterviewReport,generateResumePdf}
