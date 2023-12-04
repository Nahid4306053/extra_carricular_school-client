/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Pagebanner from "../components/Pagebanner";
import {  useParams } from "react-router-dom";
import Card from "../components/Card";
import useFetchSingelUserWithCourse from "../Hooks/FetchSingelUserWithCourse";
import axios from "axios";
import { useAuth } from "../Context/Authntication";
 export default function SingleInstructor() {
  const [instructorCourses, SetInstructorCourses] = useState([]);
  const [instructor, SetInstructor] = useState();
  const { id } = useParams();
  const {user} = useAuth()
  const [isFollow,SetIsFollow] = useState(false);
  const {userwithCourse} = useFetchSingelUserWithCourse(id,'instructor')
  const {address ,avatar,email,phone_number,username,_id} = instructor || {}

  useEffect(() => {
    if (userwithCourse){
      SetInstructor(userwithCourse.user)
      SetInstructorCourses(userwithCourse.courses)
      
    }
  }, [userwithCourse]);

  const handelFollow = async () =>{
   
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/follow/${_id}`,{},{ headers: { "Content-Type": "application/json", }, withCredentials: true, }) 
      if(res.data.error){ alert(JSON.stringify(res.data.error.msg)) } 
      else{SetIsFollow(true); alert(JSON.stringify(res.data.msg)); }
      }
      catch(err){ console.log(err) }
  }

  useEffect(()=>{
    if(instructor){
     const CheackFollow = async () =>{
       const sanpshort = await axios.get(`${import.meta.env.VITE_API_URL}/user/follow/${_id}`,{withCredentials:true});
       if(sanpshort.data.follow){
        SetIsFollow(true);
        console.log(sanpshort.data.follow);
       }   
       else{ 
        SetIsFollow(false);
       } 
     }
     CheackFollow()
    }
  },[_id, instructor])

  const Unfollow = async () =>{
    try{
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/unfollow/${_id}`,{withCredentials: true, }) 
      if(res.data.error){ alert(JSON.stringify(res.data.error.msg)) } 
      else{SetIsFollow(false) ; alert(JSON.stringify(res.data.msg));}
      }
      catch(err){ console.log(err) }  
  }

  return (
   <>
    <Pagebanner backimg={ "https://tophat.com/wp-content/uploads/BLOG_instructor-vs-professor@1X.jpg" } > <h1 className="mb-5 text-5xl font-bold">Instructor: {username}</h1> </Pagebanner>
    
   {  instructor && 

    <div className="my-20 container mx-auto">
    <div className="instructordetils  border-2  border-gray-300  grid md:grid-cols-[1fr,1fr]  lg:grid-cols-[1fr,3fr]">
     <div className="profileImg overflow-hidden md:max-h-full  ">
           <img src={avatar} className="w-full  object-cover object-top box-border md:border-gray-300 md:border-r-2 lg:max-h-72" alt="" />
      </div> 
      <div className="details flex justify-between p-8 text-2xl ">
       <div className="flex capitalize flex-col gap-5">
       <p><strong>Name:</strong> {username}</p>            
       <p><strong>Email:</strong> {email}</p>            
       <p><strong>Phone Number:</strong> {phone_number}</p>            
       <p><strong>address:</strong> {address}</p>   
       </div>         
       {user.role === "student" &&
       <div> {isFollow ? <button onClick={Unfollow} className="btn capitalize text-lg btn-secondary">@Unfollow</button> : <button onClick={handelFollow} className="btn capitalize text-lg btn-secondary">@Follow</button> }   </div>
       }      
      </div>             
    </div>
    </div>   

   }

    { instructorCourses.length > 0 &&
    <div className="mt-20 container mx-auto my-32 relatedCourse grid gap-10 grid-cols-1 lg:grid-cols-3
    md:grid-cols-2">
     <h1 className="col-span-full text-4xl">{username} Courses:</h1>      
    {instructorCourses.length > 0 && 
    instructorCourses.map((ele)=>{
       return <Card  element={ele}/>
    })
    }     
  
   </div>

    } 
</>
  );
}
