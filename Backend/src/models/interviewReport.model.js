import mongoose from "mongoose";
const technicalQuestion=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"question is required!"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    },

},{_id:false})
const behavioralQuestion=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"question is required!"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    },

},{_id:false})
const skillGap=new mongoose.Schema({
    skill :{
        type:String,
        required:[true,"skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"]

    },
  
},{_id:false})
const preparationPlan=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"tasks is required"]

    }]
},{_id:false})
const interviewReportSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    jobDescription:{
        type:String,
        required:[true,"jobDescription is required!"]
    }, 
    resumeText:{type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestion:[technicalQuestion],
    behavioralQuestion:[behavioralQuestion],
    skillGap:[skillGap],
    preparationPlan:[preparationPlan],
    title:{
        type:String,
        required:[true,"title is required for interview report"]
    }
},{timestamps:true})
const interviewModel= mongoose.model("interviewAI",interviewReportSchema)
export {interviewModel} 