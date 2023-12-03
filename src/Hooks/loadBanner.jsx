import React, { useEffect, useState } from 'react'

export default function useloadBanner() {
  const [banners , setbanners] = useState([])
  useEffect(()=>{
     const fetchBannerData =  async () =>{
        const snapshort = await fetch("/Data/CoursesBanner.json")
        const response = await snapshort.json();
        setbanners(response);
     }
     fetchBannerData()
  },[])
  return banners;
}
