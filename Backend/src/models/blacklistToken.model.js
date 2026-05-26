import mongoose from "mongoose";

const tokenBlacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required for balcklisting token"]
    }
},{timestamps:true})

const balcklistingModel=mongoose.model("tokenBlacklisting",tokenBlacklistSchema)
export {balcklistingModel}