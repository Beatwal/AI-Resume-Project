import {createBrowserRouter} from "react-router-dom"
import Login from "./features/auth/pages/Login.jsx"
import Register from "./features/auth/pages/Register.jsx"
import Forgotpassword from "./features/auth/pages/Forgotpassword.jsx"
import OTPverification from "./features/auth/pages/OTPverification.jsx"
import EmailVerification from "./features/auth/pages/EmailVerification.jsx"
import Protected from "./features/auth/components/Protected.jsx"
import PublicOnlyRoute from "./features/auth/components/PublicOnlyRoute.jsx"
import NotFound from "./features/auth/pages/NotFound.jsx"
import NewPassword from "./features/auth/pages/NewPassword.jsx"
import Home from "./features/InterviewReport/pages/Home.jsx"
import InterviewReport from "./features/InterviewReport/services/InterviewReport.jsx"


export const routes=createBrowserRouter([
    {path:"/login",
    element:<PublicOnlyRoute><Login/></PublicOnlyRoute>
    },
    {path:"/register",
        element:<PublicOnlyRoute><Register/></PublicOnlyRoute>
    },
    {path:"/forgot_password",
        
element:<PublicOnlyRoute><Forgotpassword/></PublicOnlyRoute>},
{path:"/otpverification",
element:<PublicOnlyRoute><OTPverification/></PublicOnlyRoute>
},
{
    path:"/",
    element:<Protected><Home/></Protected>
},
{path:"/email_verify",
    element:<PublicOnlyRoute> <EmailVerification/></PublicOnlyRoute>
},{
    path:"/resetpassword",
    element:<NewPassword/>}
,
{
path:"/interview/:id",
element:<Protected><InterviewReport/></Protected>
},
{path:"*",
    element:<NotFound/>
},


])