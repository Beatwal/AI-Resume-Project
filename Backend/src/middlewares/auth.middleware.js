import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js"
import { balcklistingModel } from "../models/blacklistToken.model.js"


const authenticationMiddleware=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res
        .status(401)
        .json({message:"unauthourized"})
    }
   const isTokenBalcklisting=await balcklistingModel.findOne({token})
    if(isTokenBalcklisting){
        return res
        .status(401)
        .json({message:"Invalid Token"})
    }
    try {
       const decode= jwt.verify(token,process.env.JWT_SECRECTKEY)

        const user=await userModel.findById(decode.id).select("+password")
        if(!user){
            return res
            .status(401)
            .json({message:"user not found!"})
        }
      req.user=user
        next()
         
    } catch (error) {
        return res
        .status(400)
        .json({message:"something went wrong while verify token"})
    }
}
export {authenticationMiddleware}