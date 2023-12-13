import  { useEffect, useState } from 'react'

export default function useloadCoursedata() {
    const [loading,setloading] = useState(false);
const [courses , setcourses] = useState([])
useEffect(()=>{
    setloading(true);
    const fetchBannerData = async () =>{
    const snapshort = await fetch("/Data/courses.json")
    const response = await snapshort.json();
    setcourses(response);
    setloading(false)
}
    fetchBannerData()
},[])
    return {loading,courses};
    }
