import React from 'react'
import { useAuth } from '../Context/Authntication'
import { Navigate, useLocation } from 'react-router-dom'
import { ThreeCircles } from 'react-loader-spinner'

export default function PrivateRouter({children}) {
  const {user,loading} = useAuth()
  const {pathname} = useLocation()
  if(loading){
      return (
        <div className=" flex justify-center items-center min-h-screen  w-full">
        <ThreeCircles
          height="200"
          width="200"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperclassName=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#3498db"
          innerCircleColor="#e67e22"
          middleCircleColor="#e74c3c"
        />
      </div>
        )
  }
  else{
    if(user){
      return <>{children}</>
   } 
   else if(pathname === "/login" || pathname === "/signup"){
     return <>{children}</>
   }
 
   else{
     return <Navigate to="/login" />
   } 
  }

}
