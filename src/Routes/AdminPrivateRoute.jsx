import React from 'react'
import { useAuth } from '../Context/Authntication'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function AdminPrivateRoute({children}) {
  const {user,loading} = useAuth()
  const {pathname} = useLocation()
  const navigate = useNavigate()
    if(user.role === "admin"){
      return <>{children}</>
   } 

   else{
     return navigate(-1)
   } 

}
