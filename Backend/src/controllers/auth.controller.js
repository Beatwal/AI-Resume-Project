import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailSendingService } from "../services/email.service.js";
import { balcklistingModel } from "../models/blacklistToken.model.js";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email and password",
    });
  }

  const userAlreadyexist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (userAlreadyexist) {
    return res.status(409).json({ message: "user already exist" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username: username,
    email: email,
    password: hashpassword,
  });

  const emailverifyToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRECTKEY,
    { expiresIn: "10m" },
  );
  user.emailtoken = emailverifyToken;
  user.emialtokenExpires = Date.now() + 10 * 60 * 1000;
  await user.save();
  const verifyLink = `http://localhost:5173/email_verify?token=${emailverifyToken}`;
  await emailSendingService(
    user.email,
    "Verify Your Email Address",
    `Click this link to verify:\n${verifyLink}`,
  );

  return res.status(201).json({
    message: "user register successfully!",
    
   user: {id: user._id,
    username: user.username,
    email: user.email,
    isVerified:user.isVerified
  }
  });
};
const emialverify = async (req, res) => {
  const emailverifyToken = req.query.token;
  let decode;
  try {
    decode = jwt.verify(emailverifyToken, process.env.JWT_SECRECTKEY);
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "email verification link is expired" });
    }
    return res
      .status(400)
      .json({ message: "Sorry email verification is failed" });
  }
  const user = await userModel.findOne({
    _id: decode.id,
    emailtoken: emailverifyToken,
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid or already used link",
    });
  }
  if (user.emialtokenExpires < Date.now()) {
    return res.status(401).json({ message: "verification link is expired" });
  }
  if (user.isVerified === true) {
    return res.status(400).json({
      message: "user already isVerified",
    });
  }
  user.isVerified = true;
  await user.save();
  user.emailtoken = "";
  user.emialtokenExpires = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECTKEY, {
    expiresIn: "3d",
  });
  res.cookie("token", token, {
    maxAge: 60 * 60 * 24 * 3 * 1000,
    httpOnly: true,
  });
  return res.status(200).json({ message: "verification seccessfully!", user:{id:user._id,
    username:user.username,
    email:user.email,
       isVerified:user.isVerified
  } });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password is required for login" });
  }

  const user = await userModel.findOne({ email: email }).select("+password");
 
  if (!user) {
    return res.status(404).json({ message: "no user found" });
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res
      .status(401)
      .json({ message: "unauthourized user,email or password is wrong" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECTKEY, {
    expiresIn: "3d",
  });
  res.cookie("token", token);
  return res.status(200).json({ message: "user login successfully!",user:{id:user._id,
    username:user.username,
    email:user.email,
       isVerified:user.isVerified
  } });
};
const sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await userModel.findOne({ email: email });
  console.log(user);
  if (!user) {
    return res
      .status(404)
      .json({ message: "user not exist!Please check email" });
  }
  if (user.otp) {
    user.otp = null;
    user.otpExpires = null;
  }
  const OTP = Math.floor(100000 + Math.random() * 900000);
  user.otp = OTP;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  emailSendingService(
    user.email,
    "Password Reset Request",
    `Your OTP for password reset is: ${OTP}. It is valid for 10 minutes. Do not share this code with anyone.`,
  );

  return res
    .status(201)
    .json({ message: "OTP send to user email successfully!" ,user:{id:user._id,
    username:user.username,
    email:user.email,
       isVerified:user.isVerified
  }});
};
const veryfiyOTP = async (req, res) => {
  const { OTP } = req.body;

  const user = await userModel.findOne({ otp: OTP });

  if (!user) {
    return res.status(401).json({ message: "Invalid OTP" });
  }
  if (user.otp !== OTP) {
    return res.status(401).json({ message: "Invalid OTP" });
  }
  if (user.otpExpires < Date.now()) {
    return res.status(401).json({ message: "OTP Expire Please try again!" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECTKEY, {
    expiresIn: "3d",
  });
  res.cookie("token", token);
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  return res.status(200).json({ message: "user otp successfully verify",success:true,user:{id:user._id,
    username:user.username,
    email:user.email,
    isVerified:user.isVerified
  } });
};
const newPasswordSet = async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  if (!password) {
    return res
      .status(401)
      .json({ message: "password is required for changing password" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  user.password = passwordHash;
  await user.save();
  return res.status(200).json({ message: "password reset successfully!",user:{id:user._id,
    username:user.username,
    email:user.email,
    isVerified:user.isVerified
  } });
};
const logout = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    await balcklistingModel.create({ token });
  }
  res.clearCookie("token");
  return res.status(200).json({ message: "user logout successfully",user:{id:user._id,
    username:user.username,
    email:user.email
  } });
};
const getMeController = async (req, res) => {
   const user=req.user
  return res.
  status(200)
  .json({message:"user data fetch successfully!",user:{id:user._id,username:user.username,email:user.email,isVerified:user.isVerified}})
};

export {
  registerController,
  emialverify,
  loginController,
  sendOTP,
  veryfiyOTP,
  newPasswordSet,
  logout,
  getMeController,
};
