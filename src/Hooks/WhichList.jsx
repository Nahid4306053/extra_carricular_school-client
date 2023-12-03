import React from "react";
import { useEffect } from "react";
import { useAuth } from "../Context/Authntication";

export default function useWhichList() {
  const {user} = useAuth()
  const getLocalStorageCourse = () => {
    const data = localStorage.getItem(`courses=${user._id}`);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
   
  const addCourseinLocalStorage = (data) =>{
     const  olddata = getLocalStorageCourse() ;
     const newdata = [...olddata,data] ;
     localStorage.setItem(`courses=${user._id}`,JSON.stringify(newdata))             
  }
  const removeCourseFromLocalStorage = (data) =>{
     const  olddata = getLocalStorageCourse() ;
     const newdata = olddata.filter((item) => item !== data) ;
     localStorage.setItem(`courses=${user._id}`,JSON.stringify(newdata))             
  }

  return {getLocalStorageCourse , addCourseinLocalStorage , removeCourseFromLocalStorage}
}
