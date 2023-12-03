import React, { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import { Link, useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import AboutLearningEinvrionment from "../components/Home/AboutLearningEinvrionment";
import useloadCoursedata from "../Hooks/loadCoursedata";
import Gellary from "../components/Gellary";
import useLoadGallerys from "../Hooks/lodaGellarey";
import Events from "../components/Home/Events";
import Teacher from "../components/Teacher";
import useLoadTeachers from "../Hooks/LoadTeachersData";
import ViewAllBtn from "../components/ViewAllBtn";
import usefetchcourseData from "../Hooks/FetchCourseData";
import fetchUserData from '../Hooks/fetchUserData'
import { uniqBy } from "lodash";
export default function Home() {
  const datas = useLoaderData();
  const [displyeData,setdisplyeData] = useState([]);
  const courses = useloadCoursedata() 
  const Gallerys = useLoadGallerys();
  const {Courses,fetchcourses} = usefetchcourseData()
  const [instructors,setinstructors] = useState([])
  const {fetchUsers,users} = fetchUserData();

  useEffect(()=>{
    fetchUsers('instructor',1,6)
  },[]) 
  useEffect(()=>{
    if(users){
      console.log(users.data)
         setinstructors(uniqBy([...instructors,...users.data],'_id'))
       }
  },[users])

  useEffect(()=>{
    fetchcourses(1,6)
  },[])
  useEffect(()=>{
    if(datas){
      setdisplyeData(datas);
    }
  },[datas]);

  const handleSearch = (searchKeyword) =>{
   if(searchKeyword){
     const findserchitem = datas.filter(ele => ele.Category.toLowerCase() === searchKeyword.toLowerCase())
     setdisplyeData(findserchitem);
   }
  }

  return (
    <div className="mb-20">
      <Banner serchinputdata={handleSearch} />
      <AboutLearningEinvrionment/>
      <div className="grid gap-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 my-20 container mx-auto">
        <div className="col-span-full"><h1 className="text-4xl mb-5 font-bold">What do you want to learn today?</h1></div>
         { Courses?.data.length > 0 ? 
          Courses.data.slice(0,6).map((ele,ind)=>{
           return <Card  redirect={`/details/${ele._id}`} key={ind} element={ele}/>
          })
          : <h1 className='text-4xl font-bold text-center  col-span-12'>No Data found</h1>
         }
        </div>  
        <ViewAllBtn>View all COURSE</ViewAllBtn>

        {Gallerys.length > 0 &&   <Gellary  elements={Gallerys.slice(0,6)}/> }
        <div className="col-span-12 flex justify-end container mx-auto"><button className="btn btn-info text-white my-20">View all Activites<i className="fa-thin fa-arrow-right"></i></button></div>
        <Events />

       <Link to=""> <ViewAllBtn>view all events</ViewAllBtn></Link>

        <div className=" capitalize container mx-auto mb-20"><h1 className="text-4xl mb-5 font-bold">Our Genious Instructors</h1></div>

        {instructors.length > 0 && <Teacher instructors={instructors}/>}
       
        <ViewAllBtn>See all instructor</ViewAllBtn>
    </div>
  );
}
