import jwt from "jsonwebtoken"
const googleLogin=async(req,res)=>{
const user=req.user
if(!user){
     return res.redirect("http://localhost:5173/login?error=google_auth_failed")
}
const token=jwt.sign({id:user._id},process.env.JWT_SECRECTKEY,{expiresIn:"3d"})
res.cookie("token",token)
  return res.redirect("http://localhost:5173/")
}
export {googleLogin}
