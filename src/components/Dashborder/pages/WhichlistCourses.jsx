/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import useloadCoursedata from "../../../Hooks/loadCoursedata";
import "../../../styles/CustomTable.scss";
import CourseTablerow from "../CourseTablerow";
import { useState } from "react";
import useWhichList from "../../../Hooks/WhichList";
import { useEffect } from "react";
import axios from "axios";
export default function WhichlistCourses() {
  const [wichlistCoursse,setWichlistCourses] = useState([])
  const {getLocalStorageCourse,removeCourseFromLocalStorage} = useWhichList()
   const fetchWichlist = async () =>{
     try{
      const body =getLocalStorageCourse();
      if(body.length > 0){
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/course/whichlist`,body,{
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
         }) 
         if(res.data.error){
          alert(res.data.error)
         }
         else{
          setWichlistCourses(res.data.data)
          
         }
      }
     }
     catch(err){
       console.log(err)
     }
   }
   useEffect(()=>{
  
   fetchWichlist()
  },[])
  const removefromwhislist =async (id)=>{
    removeCourseFromLocalStorage(id);
    await fetchWichlist()
  }
  return ( <>
  <div className="header w-full bg-slate-300 p-4 sticky top-0 text-center">
    <h1 className="text-2xl font-semibold">WhichLists</h1>
  </div>
   {wichlistCoursse.length > 0 ? <div className="overflow-x-auto h-[70vh] table_custom  ">
      <table className="table-pin-rows table ">
        <thead className="">
          <tr>
            <th>Course Banner</th>
            <th>Title</th>
            <th>Price</th>
            <th>Instructors</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {wichlistCoursse.length > 0 &&
            wichlistCoursse.map((ele) => {
              return (
                <CourseTablerow removebtn={true} key={ele._id} course={ele}>
                  <Link to={`../../single-course-view/${ele._id}`}>
                    <div className="tooltip" data-tip="Deatils">
                      <button className="btn btn-ghost btn-xs text-xl">
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                    </div>
                  </Link>

                  <div className="tooltip" data-tip="Remove">
                    <button onClick={()=>removefromwhislist(ele._id)} className="btn btn-ghost btn-xs text-xl">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </CourseTablerow>
              );
            })}
        </tbody>
      </table>
    </div>
    :
    <div className="h-full flex justify-center items-center w-full">
    <h1 className="text-4xl text-center font-bold">No course in Wichlist </h1>

    </div>
    
    } 
   
   
    </>
  );
}
