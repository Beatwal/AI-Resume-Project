import React, { useEffect, useRef, useState } from 'react'
import { FaSuitcase } from "react-icons/fa6"
import { LuCloudUpload } from "react-icons/lu"
import { RiAccountCircle2Line } from "react-icons/ri"
import { FaExclamationCircle } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [jobDes, setJobDes] = useState("")
  const[selfdes,setSelfdes]=useState("")
  const navigate=useNavigate()
 const resumeRef = useRef()
 
const{loading,generateReport,reports,getReports,handellogout}=useInterview()
useEffect(() => {
    getReports()
  
}, [])

console.log(reports)
const submitHandler=async()=>{

const resume=await resumeRef.current.files[0]
const data=await(generateReport({jobDescription:jobDes,selfDescription:selfdes,resumeFile:resume}))


if(data){

  navigate(`/interview/${data._id}`)
}
}

  const jobdebdescriptioHandel=(e)=>{
    setJobDes(e.target.value)
    console.log(jobDes)
    

  }
  if(loading){
   return<main className="h-screen  flex items-center justify-center text-6xl">
        
  <div className="w-14 h-14 rounded-full border-8 border-white/30 border-t-white animate-spin"></div>

        <h1> loading....</h1>
      </main>
  }
  return (
    <main className="h-screen flex items-center  justify-center relative">
 <button onClick={async()=>{
await handellogout()
 navigate('/login')
 
 }} className='w-fit px-3 py-2 absolute right-5 top-3 text-lg font-bold bg-[#dc0037] rounded-full cursor-pointer active:scale-95'> Logout </button>
     <div className='h-[90%] w-[90%] overflow-y-scroll scrollbarhide '>
      <h1 className='text-center text-3xl font-extrabold '>Create Your Custom <span className='bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent  font-bold '>Interview Plan</span></h1>
      <div className='w-full  flex items-center justify-center mt-1'>

      <p className='text-center w-[40%] text-gray-400'>Let our AI analyze the job  requirements and your unique profile to build a winning strategy.</p>
      </div>
      <div className="w-[80%] m-auto h-[82%] mt-2 bg-[#1F2435] rounded-2xl">
      <div className="w-full h-[85%]  border-gray-600 border-b flex ">

        <div className="w-[50%]  border-gray-600 border-r">
          <div className='w-full h-full px-5 py-5'>
            <div className=' flex items-center justify-between'>
    
    <h3 className=' flex items-center justify-center gap-2.5 text-xl font-bold'><FaSuitcase color='#CE3865' /> Target Job Description</h3>
    <div className='bg-pink-500/30  px-3 py-1 rounded-lg'>

    <p className='text-base   text-[#F92F76]  font-semibold'>Required</p>
    </div>

            </div>
            <div className='input-group w-full h-[90%] mt-1'>
              <textarea  onChange={jobdebdescriptioHandel} className='bg-[#2b303d] w-full h-full rounded-xl px-4 py-5 resize-none overflow-y-auto [&::-webkit-scrollbar]:hidden outline-none focus:placeholder-transparent' placeholder='Paste the full job description here ... e.g. "Senior Fronted Enginner at Google requires proficiency in React, TypeScript, and large-scale system design..."' name="jobdescription" id="jobdescription" value={jobDes} ></textarea>
            </div>


          </div>

        </div>
<div className="w-[50%]"> 
  <div className='w-full h-full px-5 py-5'>
    
    <h3 className=' flex items-center  gap-2.5 text-xl font-bold'><RiAccountCircle2Line size={24} color='#CE3865' /> Target Your Profile</h3>
       <div className=' flex items-center gap-3 mt-1'>
        <h3 className=' text-lg font-bold'>Upload Resume</h3>
    <div className='bg-pink-500/30  px-3 py-1 rounded-lg'>

    <p className='text-base   text-[#F92F76]  font-semibold'>BEST RESULTS</p>
    </div>

            </div>
          <div className='w-full h-[30%] mt-1'>
            <label className='bg-[#2b303d] w-full h-full rounded-xl flex flex-col items-center justify-center cursor-pointer border-dashed border-1 border-gray-600 ' htmlFor="resume">
              <LuCloudUpload color='#CE3865'size={24}/>
              <h4>Click to upload or drag & drop</h4>
              <p className='text-[14px] text-gray-500'>PDF Only (Max 3MB)</p>
            </label>
            <input 
           className='hidden' ref={resumeRef} type="file"  name="resume" id="resume" accept='pdf' />
          </div>
          <div className='w-full flex items-center justify-center mt-1 gap-2.5'>
            <div className='border-t-1 w-full h-full border-gray-500'></div>
            <span>OR</span>
            <div className='border-t-1 w-full h-full border-gray-500'></div>
          </div>
    
    <div className="w-full h-[25%] input-group">
      <label htmlFor="input-resume"><h2>Quick Self-Description</h2></label>
      <textarea onChange={(e)=>{
        setSelfdes(e.target.value)
        console.log(selfdes)
      }} className='mt-1 bg-[#2b303d] w-full h-full rounded-xl px-2 py-2 resize-none overflow-y-auto [&::-webkit-scrollbar]:hidden outline-none focus:placeholder-transparent' placeholder="Briefly describe your experiences, key skills, and years of experiences if you don't have a resume handy..." name="selfDescription" id="selfDescription" value={selfdes} ></textarea>
    </div>
    <div className="w-full h-[12%] mt-10 rounded-xl bg-[#223e71] input-group flex gap-2 justify-center items-center text-[14px] px-2 ">
      <FaExclamationCircle color='purple' size={24}/>
      <p className='w-full h-full'> Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan</p>
    </div>
          </div></div>

      </div>
<div className="submitgroup flex items-center justify-between px-3.5 py-2 mt-2"> 
  <p>AI-Powerd Strategy Generation . Approx 30s</p>
  <button onClick={submitHandler} className='bg-[#FE2673] rounded-lg px-2 py-2 text-lg font-semibold flex items-center gap-1 justify-between cursor-pointer active:scale-95'><FaStar /> Generate My Interview Strategy</button>
</div>
      </div>
      <div className="recent">
        <h1 className='text-2xl font-extrabold ml-38 mt-5'>My Recently Interview Plans</h1>
        <div className=' mt-3 w-[80%]  ml-34 flex items-center justify-start gap-5 flex-wrap shrink-0  '>

        {reports.length>0?reports.map((interview,idx)=>{
          return <div key={idx} onClick={(e)=>{
            navigate(`/interview/${interview._id}`)
            console.log(e,interview)
          }} className='px-3.5 py-3 w-[32%] h-40 bg-[#1F2435] rounded-2xl cursor-pointer active:scale-95'>
            <h2 className='text-2xl font-bold'>{interview.title}</h2>
            <h2 className='text-lg font-semibold'>Generate At {interview.createdAt.split("T")[0].replaceAll("-","/")}</h2>
            <p className={`${interview.matchScore>=0&&interview.matchScore<=39?"text-red-500":interview.matchScore>=40&&interview.matchScore<=54?"text-orange-500":interview.matchScore>=55&&interview.matchScore<=69?"text-yellow-500":interview.matchScore>=70&&interview.matchScore<=84?"text-emerald-400":"text-green-500"}`}>Match Score : {interview.matchScore} %</p>
          </div>
        }):null}
        </div>
      </div>
      <footer className='w-full mt-5 text-gray-500'>
        <ul className='flex items-center justify-center gap-4 text-[13px]'>
          <li className='cursor-pointer'>Privacy Policy</li>
          <li className='cursor-pointer'>Term of Service</li>
          <li className='cursor-pointer'>Help Center</li>
        </ul>
      </footer>

     </div>

   </main>
  )
}

export default Home