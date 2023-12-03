import React from 'react'
import { useAuth } from '../Context/Authntication'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function StudentPrivateRoute({children}) {
  const {user,loading} = useAuth()
  const {pathname} = useLocation()
  const navigate = useNavigate()
    if(user.role === "student"){
      return <>{children}</>
   } 

   else{
     return navigate(-1)
   } 

}
