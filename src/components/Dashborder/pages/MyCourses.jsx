/* eslint-disable react-hooks/exhaustive-deps */

import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import useloadCoursedata from "../../../Hooks/loadCoursedata";
import "../../../styles/CustomTable.scss";
import CourseTablerow from "../CourseTablerow";
import useFetchSingelUserWithCourse from "../../../Hooks/FetchSingelUserWithCourse";
import { useAuth } from "../../../Context/Authntication";
import { map } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
export default function MyCourses() {
  const [courses,setcourses] = useState([]);
  const {user} = useAuth()
  const {userwithCourse} = useFetchSingelUserWithCourse(user._id,user.role)
  useEffect(()=>{
     if(userwithCourse){

      if(user.role === 'student'){
          setcourses(map(userwithCourse.courses,'courseId'));
      }
      else{
        setcourses(map(userwithCourse.courses));
      }
   
  
     }
  },[userwithCourse])
  console.log(courses);
  
  return (
    <> 
    <div className="header bg-slate-300 text-center p-4 sticky top-0">
      <h1 className="text-2xl font-semibold">My Courses</h1>
    </div>
    {courses.length > 0 ? 
    <>
   
        <div className="overflow-x-auto h-[70vh] table_custom  custom-scrollber">
        <table className="table-pin-rows table ">
          {/* head */}
          <thead>
            <tr>
              <th>Course Banner</th>
              <th>Title</th>
              <th>Price</th>
              <th>Instructors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-lg"> 
            {courses.length > 0 &&
              courses.map((ele,ind) => {
                return (
                  <CourseTablerow removebtn={true} key={ind} course={ele}>
                    <Link to={`../../single-course-view/${ele._id}`}>
                      <div className="tooltip" data-tip="Deatils">
                        <button className="btn btn-ghost btn-xs text-xl">
                          <i className="fa-solid fa-circle-info"></i>
                        </button>
                      </div>
                    </Link>
                  </CourseTablerow>
                );
              })}
          </tbody>
        </table>
      </div>

     </>
    :  <div className="h-full flex justify-center items-center w-full">
    <h1 className="text-4xl text-center font-bold">No course found</h1>
    </div>}
    </>
   
  );
}
  