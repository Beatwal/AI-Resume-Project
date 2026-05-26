import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import passport from "passport"
import { userModel } from "../models/user.model.js";

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRECT,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ["profile", "email"] 
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        let user=await userModel.findOne({ googleId: profile.id })
            if(!user){
                user=await userModel.create({
                    googleId:profile.id,
                    email:profile.emails?.[0]?.value,
                    username:profile.displayName,
                    provider:"google",
                    isVerified:true
                })
            }
             
                return cb(null, user);
            } catch(err){
                return cb(err,null)
            }}
         
        
    ))
