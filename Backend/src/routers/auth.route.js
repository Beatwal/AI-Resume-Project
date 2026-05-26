import { Router } from "express";
import { registerValidationRule } from "../middlewares/validation.middleware.js";
import { emialverify, getMeController, loginController, logout, newPasswordSet, registerController, sendOTP, veryfiyOTP } from "../controllers/auth.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
const authRoute=Router()

authRoute.post("/register",registerValidationRule,registerController)
authRoute.get("/email-verify",emialverify)
authRoute.post("/login",loginController)
authRoute.post("/forgotpassword/sendOTP",sendOTP)
authRoute.post("/forgotpassword/veryfiyOTP",veryfiyOTP)
authRoute.post("/resetpassword",authenticationMiddleware,newPasswordSet)
authRoute.post("/logout",logout)
authRoute.get("/get-me",authenticationMiddleware,getMeController)

export {authRoute}