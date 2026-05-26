import passport from "passport";
import { Router } from "express";
import { googleLogin } from "../controllers/socialAuth.controller.js";
const socialAuth=Router()
socialAuth.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
socialAuth.get("/google/callback",passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login',
    session: false
 }),googleLogin)
 
export default socialAuth