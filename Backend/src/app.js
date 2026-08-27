import dns from "dns";

dns.setServers(["8.8.8.8"]);
import dottenv from "dotenv/config"

import express from "express"
import { authRoute } from "./routers/auth.route.js"
import interviewRoute from "./routers/interview.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import socialAuth from "./routers/socialAuth.route.js"
import passport from 'passport';
import './config/googleauth.js';
import session from "express-session"

const app=express()
app.use(session({
   secret: "yoursecret",
   resave: false,
   saveUninitialized: false
  }))

app.use(express.json())
app.use(passport.initialize());
app.use(passport.session())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//API 
app.use("/api/auth",authRoute)
app.use("/api/interview",interviewRoute)
app.use('/auth',socialAuth)

    export {app}
