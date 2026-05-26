import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from "./app.route.jsx"
import Logoicon from './features/auth/components/Logoicon.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { InterviewProvider } from './features/InterviewReport/ibterview.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
    <div className='overflow-hidden relative'>
    <Logoicon/>
<RouterProvider router={routes}/>
    </div>
    </InterviewProvider>
    </AuthProvider>
  )
}

export default App