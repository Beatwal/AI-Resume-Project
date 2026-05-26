import { useEffect, useState } from 'react'
import { HiH1, HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { CgComment } from "react-icons/cg";
import { FaRoad } from "react-icons/fa"
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { GrGenai } from "react-icons/gr";
import {
  FaCircleExclamation,
  FaTriangleExclamation,
  FaCircleCheck
} from "react-icons/fa6"
import { useInterview } from '../hooks/useInterview.js';
import { useParams } from 'react-router-dom';



const InterviewReport = () => {
  const {id}=useParams()
  console.log("this is frontend id params",id)

  const{report,getreportbyId,loading,getResumePdf}=useInterview()
  const [active, setActive] = useState("Technical Question")
  const [opentechnical,setOpentechnical]=useState([])
  const [openbehavior, setOpenbehavior] = useState([])
  const Report={
  technicalQuestion: report?.technicalQuestion || [],
  behavioralQuestion: report?.behavioralQuestion || [],
  preparationPlan: report?.preparationPlan || [],
  skillGap: report?.skillGap || [],
  matchScore: report?.matchScore || 0
}

  const leftSideMenu=[{title:"Technical Question",icon:<HiOutlineCodeBracketSquare />,report:Report.technicalQuestion},
    {title:"Behavioral Question",icon:<CgComment />,report:Report.behavioralQuestion},{title:"Road Map",icon:<FaRoad />,report:Report.preparationPlan}
  ]
 useEffect(() => {
  getreportbyId(id)
}, [id])
if(loading){
   return<main className="h-screen  flex items-center justify-center text-6xl">
        
  <div className="w-14 h-14 rounded-full border-8 border-white/30 border-t-white animate-spin"></div>

        <h1> loading....</h1>
      </main>
  }
  
  return (
    <main className="h-screen flex  items-center justify-center select-none">
      <div className='h-[85%] mt-10 w-[95%] rounded-2xl bg-[#1f2436] flex'>

        <div className="left w-[20%] h-full border-r-1 flex flex-col items-center justify-between">
          <div className='w-full px-5 py-5'>
            <h3 className='text-[13px] px-5 text-gray-400'>SECTION</h3>
          {leftSideMenu.map((e,idx)=>{
           return <div key={idx} className='mt-2'>
            <p onClick={()=>{setActive(e.title)
            console.log(e.title)
              
            }} className={` flex items-center  cursor-pointer mt-2 px-5 py-2 ${active===e.title?"bg-pink-500/30 text-[#F92F76]":"text-gray-400 hover:bg-gray-600"} rounded-lg gap-2`}>{e.icon}{e.title}</p>
           </div>
          })}

          </div>
          <button onClick={(e)=>{
            getResumePdf(id)
          }} className='w-fit flex items-center justify-center gap-1 px-5 py-2 rounded-xl text-xl active:scale-95 cursor-pointer bg-[#F92F76] text-[#ffffff] mb-2.5' > <GrGenai size={16}/> Generate Resume</button>
        </div>
        <div className="middle w-[60%] px-5 h-full overflow-scroll scrollbar-hide border-r-1 pb-2 scrollbarhide">
         <div className='text-2xl font-bold flex items-center gap-2.5 mt-5'>
          {active==="Technical Question"?<h2>Technical Questions</h2>:active==="Behavioral Question"?<h2>Behavioral Question</h2>:active==="Road Map"?<h2>Preparation Road Map</h2>:null}
          <p className='text-sm font-light text-gray-400 w-fit h-fit bg-[#4f4f4f4a] px-2 py-[2px] rounded-2xl'>{active==="Technical Question"?<span>{Report?.technicalQuestion.length} questions </span>:active==="Behavioral Question"?<span>{Report?.behavioralQuestion.length} questions </span>:active==="Road Map"?<span>{Report?.preparationPlan.length}-days plan </span>:null}</p>

         </div>
          <hr className='border-gray-500 mt-2' />
  {
    active==="Technical Question"?Report.technicalQuestion.map((e,idx)=>{
     return <div key={idx} className='w-full h-fit  mt-3 bg-[#0a0f178b] rounded-2xl'>
       <div onClick={()=>{
        if(opentechnical.includes(idx)){
          setOpentechnical(opentechnical.filter((item)=>{return item!==idx}))
        }
        else{
          setOpentechnical([...opentechnical,idx])
        }
       }}  className='mt-2 cursor-pointer flex justify-between px-5 py-5 border-b-2 border-b-gray-800'>
        <div className='flex  gap-2.5'>

        <span className='px-2 py-0.5 text-sm h-fit w-fit mt-px bg-pink-500/30 rounded-md text-[#F92F76]'>Q{idx+1}</span>
        <p className='text-base font-bold'>{e.question}</p>
        </div>
        {
          opentechnical.includes(idx)?<FaAngleUp className="text-[#F92F76]"/>:
        <FaAngleDown />
        }
        
       </div>

       <div className={`mt-2.5 transition-all ${!opentechnical.includes(idx)?"hidden":" "}`}>
      <div className="intention px-5 ">
        <span className='bg-purple-500/10 px-2  rounded-2xl py-1 text-[#a54ef6]'>INTENTION</span>
        <p className='mt-1 text-gray-400 text-base'>{e.intention}</p>
      </div>
      <div className="modelanswer px-5 mt-2">
      <span className='bg-green-500/10 px-2  rounded-2xl py-1 text-[#4ef662]'>MODEL ANSWER</span>
      <p className='mt-1 text-gray-400 text-base pb-3'>{e.answer}</p>
      </div>
 
       </div>
     </div>
    }):active==="Behavioral Question"?Report.behavioralQuestion.map((e,idx)=>{
     return <div key={idx} className='w-full h-fit  mt-3 bg-[#0a0f178b] rounded-2xl'>
       <div onClick={()=>{
        console.log(idx)
        if(openbehavior.includes(idx)){
          setOpenbehavior(openbehavior.filter((item)=>{return item!==idx}))
        }
        else{
          setOpenbehavior([...openbehavior,idx])
        }
       }} className='mt-2 cursor-pointer flex justify-between px-5 py-5 border-b-2 border-b-gray-800'>
        <div className='flex  gap-2.5'>

        <span className='px-2 py-0.5 text-sm h-fit w-fit mt-px bg-pink-500/30 rounded-md text-[#F92F76]'>Q{idx+1}</span>
        <p className='text-base font-bold'>{e.question}</p>
        </div>{
          openbehavior.includes(idx)?<FaAngleUp className="text-[#F92F76]"/>:
        <FaAngleDown />
        }
        
       </div>

      <div className={`mt-2.5 ${!openbehavior.includes(idx)?"hidden":""}`}>
      <div className="intention px-5 ">
        <span className='bg-purple-500/10 px-2  rounded-2xl py-1 text-[#a54ef6]'>INTENTION</span>
        <p className='mt-1 text-gray-400 text-base'>{e.intention}</p>
      </div>
      <div className="modelanswer px-5 mt-2">
      <span className='bg-green-500/10 px-2  rounded-2xl py-1 text-[#4ef662]'>MODEL ANSWER</span>
      <p className='mt-1 text-gray-400 text-base pb-3'>{e.answer}</p>
      </div>
 
       </div>
     </div>
    }):active==="Road Map"? (
  <div className="relative mt-5">

    
    <div className="absolute left-[11px] top-0 h-full w-[2px] bg-gradient-to-b from-pink-400 via-[#F92F76] to-purple-500"></div>

    {
      Report.preparationPlan.map((plan, idx) => {
        return (
          <div
            key={idx}
            className="relative pl-10 pb-3"
          >

            
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-[#F92F76] bg-[#111827]">
            </div>

     
            <div className=" p-5">
          <div className='flex items-center w-full h-fit gap-2'>

              <span className="px-2 py-1 text-sm w-fit h-fit bg-pink-500/30 rounded-md text-[#F92F76]">
                Day {idx + 1}
              </span>

              <p className="text-lg font-bold ">
                {plan.focus}
              </p>
          </div>
          <ul className='mt-2 list-disc pl-4'>
{plan.tasks.map((plan,idx)=>{
return<li className='mt-1 text-gray-400 text-base' key={idx}>{plan}</li>
})}
          </ul>
              
            </div>
          </div>
        )
      })
    }

  </div>
) : null
  }
        </div>
        <div className="right w-[20%] h-full px-2">
          <div className='w-full flex flex-col items-center justify-center mt-2 gap-1.5 border-b border-gray-500 py-3'>
            <h2 className='text-gray-400'>MATCH SCORE</h2>
            <div className={`h-30 w-30 rounded-full border-8 flex items-center justify-center flex-col ${Report.matchScore>=0&&Report.matchScore<=39?"border-red-500":Report.matchScore>=40&&Report.matchScore<=54?"border-orange-500":Report.matchScore>=55&&Report.matchScore<=69?"border-yellow-500":Report.matchScore>=70&&Report.matchScore<=84?"border-emerald-400":"border-green-500"}`}>
            <h3 className='text-6xl font-extrabold'>{Report.matchScore}</h3>
              <span className='text-sm text-gray-400'>%</span>
            </div>
          <p className={`${Report.matchScore>=0&&Report.matchScore<=39?"text-red-500":Report.matchScore>=40&&Report.matchScore<=54?"text-orange-500":Report.matchScore>=55&&Report.matchScore<=69?"text-yellow-500":Report.matchScore>=70&&Report.matchScore<=84?"text-emerald-400":"text-green-500"}`}>{Report.matchScore>=0&&Report.matchScore<=39?"Limited Match for This Role":Report.matchScore>=40&&Report.matchScore<=54?"Partial Match for This Role":Report.matchScore>=55&&Report.matchScore<=69?"Potential Match for This Role":Report.matchScore>=70&&Report.matchScore<=84?"Strong Match for This Role":"Highly Aligned with This Role"}</p>
          </div>
          <div className="skillgap w-full h-full flex flex-col  px-3  mt-2">
            <h2 className='text-gray-400 mb-2'>SKILL GAPs</h2>
            <div className='overflow-scroll scrollbarhide w-full h-[54%]  '>

            {Report.skillGap.map((e,idx)=>{
                return <div key={idx} className={`w-full h-fit px-2 py-3 rounded-2xl mt-2 flex items-center ${e.severity==="high"?"bg-pink-500/30 text-[#F92F76]":e.severity==="medium"?"bg-yellow-500/30 text-[#f9d72f]":e.severity==="low"?"bg-green-500/30 text-[#2ff96f]":""}` } >
                <p className='flex  gap-2 text-lg font-bold'>{e.severity==="high"?<FaCircleExclamation className="text-red-400 mt-1" />:e.severity==="medium"?<FaTriangleExclamation className="text-yellow-400 mt-1" />:e.severity==="low"?<FaCircleCheck className="text-green-400 mt-1" />:""}{e.skill} </p> </div>
            })}
            </div>
          </div>

        </div>
      </div>

    </main>
  )
}

export default InterviewReport


