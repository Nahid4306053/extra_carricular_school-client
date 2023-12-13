import axios from "axios";
import React, { useEffect, useState } from "react";

export default function usefetchcourseData() {
  const [loading,setloading] = useState(true);
  const [Courses, setcourses] = useState();
   const fetchcourses = async (page,limit,category) => {
      try {
        setloading(true) 
        const snapshort = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/all?${
            page ? "page=" + page + "&" : ""
          }${limit ? "limit=" + limit + "&" : ""}${category ? "category=" + category : ""}`
        ,{withCredentials:true});
        setcourses(snapshort.data);
        setloading(false) 
      } catch (err) {
        setloading(false) 
        console.log(err);
      }
    };
 
  return {Courses,fetchcourses,loading}
}
