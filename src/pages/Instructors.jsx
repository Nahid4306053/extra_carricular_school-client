import React, { useEffect, useState } from "react";
import useLoadTeachers from "../Hooks/LoadTeachersData";
import Teacher from "../components/Teacher";
import fetchUserData from '../Hooks/fetchUserData'
import { uniqBy } from "lodash";
export default function Instructors() {
  const [instructors,setinstructors] = useState([])
  const {fetchUsers,users} = fetchUserData();

  useEffect(()=>{
    fetchUsers('instructor')
   
  },[])
  useEffect(()=>{
    if(users){
         setinstructors(uniqBy([...instructors,...users.data],'_id'))
       }
  },[users])
  return (
    <>
      <div className="banner">
        <div
          className="hero -mt-36 min-h-[600px]"
          style={{
            backgroundImage:
              "url(https://tophat.com/wp-content/uploads/BLOG_instructor-vs-professor@1X.jpg)", backgroundPosition:"top"
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Instructors</h1>
            </div>
          </div>
        </div>
      </div>
     <div className="my-20">
     {instructors && <Teacher instructors={instructors}/>}
     </div>
    </>
  );
}
