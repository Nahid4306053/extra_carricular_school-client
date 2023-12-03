import React, { useEffect, useState } from 'react'

export default function useloadCoursedata() {
const [courses , setcourses] = useState([])
useEffect(()=>{
    const fetchBannerData = async () =>{
    const snapshort = await fetch("/Data/courses.json")
    const response = await snapshort.json();
    setcourses(response);
}
    fetchBannerData()
},[])
    return courses;
    }
